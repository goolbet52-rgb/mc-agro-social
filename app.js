"use strict";
const $ = id => document.getElementById(id);
const W=1080,H=1350;
let exportsPng=[];
const encoder=new TextEncoder();
function notice(s,err=false){$("message").textContent=s;$("message").className=err?"error":""}
function fitText(ctx,text,maxWidth,fontSize,minSize=30,weight=700){
 for(let size=fontSize;size>=minSize;size-=2){ctx.font=weight+" "+size+"px system-ui, sans-serif";if(ctx.measureText(text).width<=maxWidth)return size}return minSize;
}
function lines(ctx,text,maxWidth,maxLines=4){
 const words=String(text).split(/\s+/),out=[];let line="";
 for(const word of words){let trial=line?line+" "+word:word;
 if(ctx.measureText(trial).width>maxWidth&&line){out.push(line);line=word;}else line=trial;
 if(out.length>=maxLines)break;}
 if(out.length<maxLines&&line)out.push(line);
 if(out.join(" ").length<text.length&&out.length){let s=out.pop();while(s.length&&ctx.measureText(s+"…").width>maxWidth)s=s.slice(0,-1);out.push(s+"…");}
 return out;
}
function multi(ctx,text,x,y,maxWidth,step,maxLines=4){const arr=lines(ctx,text,maxWidth,maxLines);arr.forEach((l,i)=>ctx.fillText(l,x,y+i*step));return y+arr.length*step}
function roundRect(ctx,x,y,w,h,r,fill){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();}
function gradient(ctx){let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#184c38");g.addColorStop(1,"#09291e");ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function brand(ctx,index,demo){ctx.fillStyle="#e0be70";ctx.font="bold 36px system-ui";ctx.fillText("MC  IMÓVEIS RURAIS",70,92);ctx.fillStyle="#fff9";ctx.font="25px system-ui";ctx.fillText("RONDÔNIA • BRASIL",72,130);ctx.fillStyle="#d9be80";ctx.font="bold 22px system-ui";ctx.fillText(String(index+1).padStart(2,"0")+" / 05",930,91);
 if(demo){roundRect(ctx,50,160,980,58,12,"#b94e35");ctx.fillStyle="#fff";ctx.font="bold 28px system-ui";ctx.fillText("DEMONSTRAÇÃO — IMÓVEL FICTÍCIO",85,199)}}
function cover(ctx,img,x,y,w,h){if(!img){roundRect(ctx,x,y,w,h,26,"#2c6a4f");ctx.strokeStyle="#d4b66e";ctx.lineWidth=3;for(let i=0;i<11;i++){ctx.beginPath();ctx.moveTo(x+i*120,y+h);ctx.lineTo(x+i*120+240,y);ctx.stroke()}ctx.fillStyle="#ffffffaa";ctx.font="bold 30px system-ui";ctx.fillText("SEM FOTO — MODELO DE TESTE",x+40,y+h/2);return;}
 const ratio=Math.max(w/img.width,h/img.height),dw=img.width*ratio,dh=img.height*ratio;ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,26);ctx.clip();ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();}
function money(n){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(n)}
function draw(data,photos,i){let c=document.createElement("canvas");c.width=W;c.height=H;let ctx=c.getContext("2d");gradient(ctx);brand(ctx,i,data.demo);
 ctx.fillStyle="#f7f5e9";ctx.textBaseline="alphabetic";
 if(i===0){
  cover(ctx,photos[0],50,240,980,650);
  roundRect(ctx,60,835,960,365,24,"#103a2deE");
  ctx.fillStyle="#e4c27a";ctx.font="bold 32px system-ui";ctx.fillText("OPORTUNIDADE RURAL",94,900);
  ctx.fillStyle="white";ctx.font="bold 66px system-ui";multi(ctx,data.title,94,984,875,77,2);
  ctx.fillStyle="#d2decf";ctx.font="35px system-ui";ctx.fillText(data.city+" • "+data.state,94,1155);
 }else if(i===1){
  ctx.fillStyle="#e4c27a";ctx.font="bold 48px system-ui";ctx.fillText("CONHEÇA A PROPRIEDADE",60,305);
  cover(ctx,photos[1]||photos[0],60,350,960,720);
  ctx.fillStyle="#fff";ctx.font="34px system-ui";ctx.fillText("Fotografias reais • "+data.city,65,1140);
 }else if(i===2){
  ctx.fillStyle="#e4c27a";ctx.font="bold 48px system-ui";ctx.fillText("ÁREA E LOCALIZAÇÃO",65,330);
  roundRect(ctx,65,395,950,320,24,"#286046");
  ctx.fillStyle="#fff";ctx.font="bold 132px system-ui";ctx.fillText(data.area.toLocaleString("pt-BR"),115,555);
  ctx.font="bold 45px system-ui";ctx.fillText("HECTARES",115,632);
  ctx.fillStyle="#e4c27a";ctx.font="bold 43px system-ui";ctx.fillText(data.city+" — "+data.state,70,823);
  ctx.fillStyle="#fff";ctx.font="31px system-ui";multi(ctx,data.features,70,910,930,45,5);
 }else if(i===3){
  cover(ctx,photos[2]||photos[0],65,255,950,560);
  ctx.fillStyle="#e4c27a";ctx.font="bold 43px system-ui";ctx.fillText("VALOR ANUNCIADO",70,930);
  const value=money(data.price);ctx.fillStyle="#fff";ctx.font="bold "+fitText(ctx,value,950,86,46)+"px system-ui";ctx.fillText(value,70,1044);
  ctx.fillStyle="#cdd9cf";ctx.font="29px system-ui";ctx.fillText("Confirme disponibilidade e condições com a imobiliária.",70,1140);
 }else{
  ctx.fillStyle="#e4c27a";ctx.font="bold 49px system-ui";ctx.fillText("QUER CONHECER ESTA ÁREA?",65,350);
  ctx.fillStyle="#fff";ctx.font="bold 57px system-ui";multi(ctx,"Fale com a MC Imóveis Rurais",65,485,940,70,3);
  roundRect(ctx,65,700,950,130,20,"#d9b66f");
  ctx.fillStyle="#123c2b";ctx.font="bold 36px system-ui";ctx.fillText("SOLICITE MAIS INFORMAÇÕES",105,780);
  ctx.fillStyle="#fff";ctx.font="28px system-ui";
  multi(ctx,data.contact||"Contato: consulte os canais oficiais da imobiliária",65,925,940,44,3);
  if(data.link){ctx.font="24px system-ui";multi(ctx,data.link,65,1080,940,38,3);}
 }
 ctx.fillStyle="#c7d1c6";ctx.font="24px system-ui";ctx.fillText("mcimoveisrurais.com.br",65,1275);
 return c;
}
function loadImage(file){return new Promise((resolve,reject)=>{let u=URL.createObjectURL(file),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);resolve(im)};im.onerror=()=>{URL.revokeObjectURL(u);reject(Error("Imagem inválida"))};im.src=u})}
function getData(){let d={title:$("title").value.trim(),city:$("city").value.trim(),state:$("state").value.trim().toUpperCase(),area:Number($("area").value),price:Number($("price").value),features:$("features").value.trim(),link:$("link").value.trim(),contact:$("contact").value.trim(),demo:$("demo").checked};
 if(!d.title||!d.city||!d.state||!Number.isFinite(d.area)||d.area<=0||!Number.isFinite(d.price)||d.price<=0)throw Error("Preencha título, cidade, estado, área e preço válidos.");
 if(d.link&&!/^https:\/\//i.test(d.link))throw Error("O link deve começar com https://");
 if(!d.demo&&!$("photos").files.length)throw Error("Selecione ao menos uma fotografia real ou ative a demonstração.");
 return d;
}
function canvasBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error("Não foi possível gerar PNG")),"image/png"))}
$("generate").addEventListener("click",async()=>{
 $("generate").disabled=true;$("download").disabled=true;notice("Gerando carrossel…");
 try{const d=getData(),files=[...$("photos").files].slice(0,8);
 if(files.some(f=>!["image/jpeg","image/png","image/webp"].includes(f.type)||f.size>12*1024*1024))throw Error("Use JPEG, PNG ou WebP com até 12 MB por arquivo.");
 const photos=await Promise.all(files.map(loadImage));exportsPng=[];$("cards").replaceChildren();
 for(let i=0;i<5;i++){const canvas=draw(d,photos,i),blob=await canvasBlob(canvas),url=URL.createObjectURL(blob);exportsPng.push({name:"mc-agro-"+(i+1)+".png",blob});let fig=document.createElement("figure"),img=document.createElement("img"),cap=document.createElement("figcaption");img.src=url;img.alt="Arte "+(i+1);img.onload=()=>URL.revokeObjectURL(url);cap.textContent="Arte "+(i+1)+" • 1080 × 1350";fig.append(img,cap);$("cards").append(fig);}
 $("caption").value=d.title+" | "+d.city+" - "+d.state+"\n📐 Área: "+d.area.toLocaleString("pt-BR")+" hectares\n💰 Valor: "+money(d.price)+"\n"+(d.features?d.features+"\n":"")+(d.contact?"📲 "+d.contact+"\n":"")+"Consulte disponibilidade e condições. "+(d.link?"\n"+d.link:"")+(d.demo?"\n⚠️ EXEMPLO FICTÍCIO — NÃO É OFERTA REAL":"");
 $("download").disabled=false;notice("Cinco artes geradas com sucesso. Nenhum serviço externo foi chamado.");
 }catch(e){notice(e.message,true)}finally{$("generate").disabled=false}
});
$("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText($("caption").value);notice("Legenda copiada.")}catch{notice("Selecione e copie a legenda manualmente.",true)}});
function crc32(data){let c=0xffffffff;for(const b of data){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function u16(n){return [n&255,(n>>>8)&255]}function u32(n){return [n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]}
async function createZip(entries){const local=[],central=[];let offset=0;
 for(const e of entries){const name=encoder.encode(e.name),bytes=new Uint8Array(await e.blob.arrayBuffer()),crc=crc32(bytes);
 const header=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(bytes.length),...u32(bytes.length),...u16(name.length),...u16(0),...name]);
 local.push(header,bytes);
 central.push(new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(crc),...u32(bytes.length),...u32(bytes.length),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset),...name]));offset+=header.length+bytes.length;}
 const centralSize=central.reduce((n,a)=>n+a.length,0),end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(entries.length),...u16(entries.length),...u32(centralSize),...u32(offset),...u16(0)]);
 return new Blob([...local,...central,end],{type:"application/zip"});
}
$("download").addEventListener("click",async()=>{try{const blob=await createZip([...exportsPng,{name:"legenda.txt",blob:new Blob([$("caption").value],{type:"text/plain"})}]),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="mc-agro-social-carrossel.zip";a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);notice("ZIP pronto para download.")}catch(e){notice(e.message,true)}});
