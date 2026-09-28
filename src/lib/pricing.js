export function parseMoneyToken(token='') {
  const cleaned=String(token).toLowerCase().replace(/rs\.?/g,'').replace(/,/g,'').trim();
  const m=cleaned.match(/(\d+(?:\.\d+)?)\s*k?/);
  if(!m) return null;
  let value=Number(m[1]);
  if(/\d(?:\.\d+)?\s*k/i.test(cleaned)) value*=1000;
  return value;
}

export function parseRange(label='') {
  const normalized=String(label).replace(/–/g,'-');
  const m=normalized.match(/(\d+(?:\.\d+)?\s*k?)\s*-\s*(\d+(?:\.\d+)?\s*k?)/i);
  if(!m) return null;
  return {min:parseMoneyToken(m[1]),max:parseMoneyToken(m[2])};
}

export function splitOptions(name='') {
  return String(name).split(/\s*\/\s*/).map(v=>v.trim()).filter(Boolean);
}

export function getPricingModel(service) {
  if(!service) return {type:'fixed',price:0};
  const label=service.priceLabel||'';
  const nameOptions=splitOptions(service.name||'');

  if(service.unitRate){
    const nums=String(service.units||label).match(/\d+(?:\.\d+)?/g)?.map(Number)||[];
    const min=nums[0]||1;
    const max=nums[1]||nums[0]||min;
    return {type:'units',unitRate:Number(service.unitRate),min,max,nameOptions};
  }

  const range=parseRange(label);
  if(range?.min!=null&&range?.max!=null){
    return {type:'range',min:range.min,max:range.max,nameOptions};
  }

  const moneyTokens=(label.match(/\d+(?:\.\d+)?\s*k?|\d[\d,]*/gi)||[])
    .map(parseMoneyToken).filter(v=>v!=null);
  if(nameOptions.length>1 && moneyTokens.length>=nameOptions.length && /\//.test(label)){
    return {type:'variants',options:nameOptions.map((name,i)=>({name,price:moneyTokens[i]}))};
  }

  const perUnit=/\/\s*(ml|thread|pair|drip|ses(?:sion)?)\b/i.exec(label);
  if(perUnit){
    return {type:'quantity',unit:perUnit[1],unitPrice:Number(service.price||0),nameOptions};
  }

  if(/\bea\b/i.test(label)){
    return {type:'quantity',unit:'item',unitPrice:Number(service.price||0),nameOptions};
  }

  if(nameOptions.length>1){
    return {type:'choice',options:nameOptions,price:Number(service.price||0)};
  }

  return {type:'fixed',price:Number(service.price||0)};
}

export function initialPricingSelection(service){
  const model=getPricingModel(service);
  if(model.type==='units'){
    return {option:'',quantity:model.min,unitPrice:model.unitRate,finalPrice:model.min*model.unitRate,detail:model.min+' units'};
  }
  if(model.type==='range'){
    return {option:model.nameOptions?.[0]||'',quantity:1,unitPrice:null,finalPrice:model.min,detail:model.nameOptions?.[0]||'Within listed range'};
  }
  if(model.type==='variants'){
    const first=model.options[0];
    return {option:first.name,quantity:1,unitPrice:first.price,finalPrice:first.price,detail:first.name};
  }
  if(model.type==='quantity'){
    return {option:model.nameOptions?.[0]||'',quantity:1,unitPrice:model.unitPrice,finalPrice:model.unitPrice,detail:model.nameOptions?.[0]||('1 '+model.unit)};
  }
  if(model.type==='choice'){
    return {option:model.options[0]||'',quantity:1,unitPrice:model.price,finalPrice:model.price,detail:model.options[0]||''};
  }
  return {option:'',quantity:1,unitPrice:model.price,finalPrice:model.price,detail:''};
}
