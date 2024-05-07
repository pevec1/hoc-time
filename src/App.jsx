/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import moment from "moment-timezone";
function DateTimeClear({ date }) {
  return <DateTimePretty date={date} />;
}

function DateTimePretty({ date }) {
  const dt = new Date();
  console.log(dt);
  console.log(date);
  const words = date.split(" ");
  console.log(words);
  const ymd = words[0].split("-", 3);
  const hms = words[1].split(":", 3);
  console.log(
    Number(ymd[0]),
    Number(ymd[1]) - 1,
    Number(ymd[2]),
    Number(hms[0]),
    Number(hms[1]),
    Number(hms[2])
  ); //2017-09-01 14:15:10
  let date2 = new Date(
    Number(ymd[0]),
    Number(ymd[1]) - 1,
    Number(ymd[2]),
    Number(hms[0]),
    Number(hms[1]),
    Number(hms[2])
  ); //new Date(year, month, day, hours, minutes, seconds, ms);
  console.log(date2);
  let hour = dt.getTime() - date2.getTime();
  if (hour > 0 && hour < 3600000) {
    hour = hour / 60000;
    hour = hour.toFixed(0);
    hour = " " + hour + " минут назад";
  } else if (hour > 3600000 && hour < 86400000) {
    hour = hour / 3600000;
    hour = hour.toFixed(0);
    hour = " " + hour + " часов назад";
  } else if (hour > 86400000) {
    hour = hour / 86400000;
    hour = hour.toFixed(0);
    hour = " " + hour + " дней назад";
  }
  console.log(hour);

  return (
    <p className="date">
      {date} = {hour}
    </p>
  );
}
function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        // eslint-disable-next-line react/no-unknown-property
        frameorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <DateTimeClear date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item, index) => (
    <Video key={index} url={item.url} date={item.date} />
  ));
}

export default function App() {
  const [list] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-03-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);
  //******************************************** */

  const clock = moment().format("LTS").toString(); //new Date().toLocaleTimeString();
  console.log(clock);
  const [time, setTime] = useState(Date.now());
  console.log(time);
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <VideoList list={list} />;
}
