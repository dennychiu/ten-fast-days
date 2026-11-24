const days = [
  {day:1,name:"南無定光王如來",note:"持齋修善，清淨身心。"},
  {day:8,name:"南無藥師琉璃光如來",note:"發願行善，祈願身心安穩。"},
  {day:14,name:"南無賢劫千佛",note:"恭敬稱念，廣修善行。"},
  {day:15,name:"南無阿彌陀佛",note:"憶佛念佛，回向一切有情。"},
  {day:18,name:"南無觀世音菩薩",note:"慈悲利他，聞聲救苦。"},
  {day:23,name:"南無盧舍那佛",note:"精進修持，培植善根。"},
  {day:24,name:"毘盧遮那佛",note:"恭敬稱念，攝心向善。"},
  {day:28,name:"南無大願地藏菩薩",note:"孝親報恩，發大願心。"},
  {day:29,name:"南無藥王藥上菩薩",note:"廣行善法，利益眾生。"},
  {day:30,name:"南無釋迦牟尼佛",note:"依教奉行，長養慈悲智慧。"},
];
export default function Home() { return <main className="shell"><header className="hero"><div className="eyebrow">清淨・光明・簡單・莊嚴</div><h1>十齋日</h1><p>於十齋日持齋修善、稱念聖號，將善念與功德回向一切眾生。</p><div className="hero-mark">☸</div></header><section className="intro"><h2>十齋日修持提醒</h2><p>每逢農曆初一、初八、十四、十五、十八、二十三、二十四、二十八、二十九及三十日，歡迎大眾隨分隨力持齋、念佛、行善、回向。</p></section><section><div className="section-title"><div><span>MONTHLY PRACTICE</span><h2>十齋日聖號</h2></div><small>農曆日期</small></div><div className="day-grid">{days.map(item=><article className="day-card" key={item.day}><div className="day-number">初{item.day===1?"一":item.day===8?"八":""}{![1,8].includes(item.day)?item.day+"日":""}</div><div><h3>{item.name}</h3><p>{item.note}</p></div><span className="lotus">蓮</span></article>)}</div></section><footer><div>願以此功德，普及於一切</div><strong>佛光普照・內外大吉祥</strong><small>十齋日弘法資訊平台</small></footer></main> }
