'use strict';
const $=id=>document.getElementById(id),canvas=$('poster'),ctx=canvas.getContext('2d');
let portrait=null,ready=false,working=false;
const devotionalHeader=new Image();
const templateReady=(async()=>{devotionalHeader.src='assets/devotional-header.png';await devotionalHeader.decode();})();
const controls=['zoom','horizontal','vertical','reset'];
function rounded(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function text(
  s, x, y, size,
  color = '#731d2d',
  weight = 700,
  max = 980
) {
  ctx.save();

  const safeWidth = Math.min(
    max,
    2 * Math.min(x - 60, canvas.width - 60 - x)
  );

  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let measuredWidth;

  do {
    ctx.font = `${weight} ${size}px Kannada, sans-serif`;

    const metrics = ctx.measureText(s);

    measuredWidth = Math.max(
      metrics.width,
      Math.abs(metrics.actualBoundingBoxLeft || 0) +
      Math.abs(metrics.actualBoundingBoxRight || 0)
    );

    if (measuredWidth <= safeWidth || size <= 16) break;
    size -= 1;
  } while (true);

  // Fit the actual lettering within the available space.
  const scale = Math.min(
    1,
    safeWidth / Math.max(measuredWidth, 1)
  );

  ctx.translate(x, y);
  ctx.scale(scale, 1);
  ctx.fillText(s, 0, 0, safeWidth / scale);

  ctx.restore();
}
function ornament(y){ctx.strokeStyle='#c29648';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(120,y);ctx.lineTo(485,y);ctx.moveTo(595,y);ctx.lineTo(960,y);ctx.stroke();ctx.save();ctx.translate(540,y);ctx.rotate(Math.PI/4);ctx.fillStyle='#c29648';ctx.fillRect(-8,-8,16,16);ctx.restore();}
function draw(){const story=$('format').value==='story';canvas.height=story?1920:1350;const H=canvas.height;ctx.fillStyle='#fff7e3';ctx.fillRect(0,0,1080,H);const bg=ctx.createRadialGradient(540,H*.4,0,540,H*.4,H*.8);bg.addColorStop(0,'#fffcef');bg.addColorStop(1,'#efdbac');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,H);ctx.strokeStyle='#b68b40';ctx.lineWidth=4;rounded(24,24,1032,H-48,25);ctx.stroke();ctx.lineWidth=1;rounded(37,37,1006,H-74,20);ctx.stroke();
if(devotionalHeader.complete&&devotionalHeader.naturalWidth){const headerH=990*devotionalHeader.naturalHeight/devotionalHeader.naturalWidth;ctx.save();rounded(45,45,990,headerH,12);ctx.clip();ctx.drawImage(devotionalHeader,45,45,990,headerH);ctx.restore();}
text('ದೈವಾನುಗ್ರಹ ಮತ್ತು ಹಿರಿಯರ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ',540,425,26,'#8c6c3d',600,950);
text('ಮಂಡ್ಯ ಜಿಲ್ಲಾ ಬ್ರಾಹ್ಮಣ ಸಭಾ ಚುನಾವಣೆ',540,480,40);ornament(520);
const photoY=story?585:550,photoH=story?805:410,photoX=story?230:300,photoW=story?620:480;
ctx.fillStyle='#f1e4c8';rounded(photoX,photoY,photoW,photoH,145);ctx.fill();ctx.save();rounded(photoX+9,photoY+9,photoW-18,photoH-18,137);ctx.clip();if(portrait){const w=photoW-18,h=photoH-18,s=Math.max(w/portrait.width,h/portrait.height)*Number($('zoom').value),iw=portrait.width*s,ih=portrait.height*s;const x=photoX+9+(w-iw)/2+Number($('horizontal').value)*(iw-w)/2,y=photoY+9+(h-ih)/2+Number($('vertical').value)*(ih-h)/2;ctx.drawImage(portrait,x,y,iw,ih);}else{ctx.fillStyle='#e2ceb0';ctx.beginPath();ctx.arc(540,photoY+photoH*.34,72,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(540,photoY+photoH*.79,165,150,0,0,Math.PI*2);ctx.fill();text('ನಿಮ್ಮ ಫೋಟೋ',540,photoY+photoH-55,26,'#806d55',500);}ctx.restore();ctx.strokeStyle='#b89042';ctx.lineWidth=7;rounded(photoX,photoY,photoW,photoH,145);ctx.stroke();
const name=$('name').value.trim();if(name)text(name,540,photoY+photoH+35,30,'#6f4b31',650,850);
const y=story?1480:1025;
ctx.fillStyle='#731d2d';rounded(80,y-10,920,story?205:140,18);ctx.fill();text('ಈ ಬಾರಿ ನಾನು ಮತದಾನ ಮಾಡುತ್ತೇನೆ',540,y+43,46,'#fff5da',750,870);text('ನಮ್ಮ ಸಮಾಜಕ್ಕಾಗಿ • ನಮ್ಮ ಭವಿಷ್ಯಕ್ಕಾಗಿ',540,y+100,26,'#e8c77e',500,870);
const bottom=H-140;ornament(bottom-35);text('ಜಿ. ವಿ. ನಾಗರಾಜು ಅವರ ತಂಡದ ಅಭಿಯಾನ',540,bottom,35,'#731d2d',700,930);text('ನಿಮ್ಮ ಭಾಗವಹಿಸುವಿಕೆಯೇ ನಮ್ಮ ಶಕ್ತಿ',540,bottom+48,29,'#8c6c3d',500);text('ಮತದಾನದಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಿ • ಜಾಗೃತಿ ಮೂಡಿಸಿ',540,H-55,22,'#8c6c3d',500);
}
function message(s){$('status').textContent=s;}
$('photo').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)){message('Please choose a JPG, PNG or WebP image.');e.target.value='';return;}if(file.size>15*1024*1024){message('Please choose a photo under 15 MB.');e.target.value='';return;}message('Loading photo…');const url=URL.createObjectURL(file);try{const img=new Image();img.src=url;await img.decode();if(img.width*img.height>50000000)throw Error('large');portrait=img;reset();controls.forEach(id=>$(id).disabled=false);$('download').disabled=!ready;$('share').disabled=!ready;message('Photo ready. Adjust the crop, then download or share.');draw();}catch{message('Could not open this photo. Try a smaller JPG, PNG or WebP.');}finally{URL.revokeObjectURL(url);e.target.value='';}});
function reset(){$('zoom').value=1;$('horizontal').value=0;$('vertical').value=0;draw();}
$('reset').addEventListener('click',reset);['zoom','horizontal','vertical','name','format'].forEach(id=>$(id).addEventListener('input',draw));
async function blob(){await templateReady;await document.fonts.ready;draw();return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('export')),'image/png'));}
function save(b){const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='mandya-my-vote-poster.png';a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);}
async function run(share){if(!portrait||!ready||working)return;working=true;try{const b=await blob();const file=new File([b],'mandya-my-vote-poster.png',{type:'image/png'});if(share&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'ನಾನು ಮತದಾನ ಮಾಡುತ್ತೇನೆ',text:'ಮಂಡ್ಯ ಜಿಲ್ಲಾ ಬ್ರಾಹ್ಮಣ ಸಭಾ ಚುನಾವಣೆ — ಜಿ. ವಿ. ನಾಗರಾಜು ಅವರ ತಂಡದ ಅಭಿಯಾನ'});message('Poster shared.');}else{save(b);message(share?'Poster downloaded. Attach it in your preferred social app.':'Poster downloaded. Ready to post!');}}catch(e){if(e.name!=='AbortError')message('Could not export. Please try again.');}finally{working=false;}}
$('download').addEventListener('click',()=>run(false));$('share').addEventListener('click',()=>run(true));
draw();Promise.all([templateReady,document.fonts.load('700 40px Kannada')]).then(()=>{if(!document.fonts.check('700 40px Kannada'))throw Error('font');ready=true;draw();$('download').disabled=!portrait;$('share').disabled=!portrait;}).catch(()=>{message('Poster images or Kannada font could not load. Please refresh before downloading.');});
