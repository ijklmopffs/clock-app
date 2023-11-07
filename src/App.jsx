import refresh from "../assets/desktop/icon-refresh.svg";
import moon from "../assets/desktop/icon-moon.svg";
import sun from "../assets/desktop/icon-sun.svg";
import arrowUp from "../assets/desktop/icon-arrow-up.svg";
import arrowDown from "../assets/desktop/icon-arrow-down.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [translate, setTranslate] = useState(false);
  const [night, setNight] = useState(false);
  const [quotes, setQuotes] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [formattedTime, setFormattedTime] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  const handleTranslate = () => {
    setTranslate(!translate);
  };

  const handleNight = () => {
    setNight(!night);
  };

  const handleSearch = () => {
    const url = `https://api.quotable.io/quotes/random`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuotes(data);
      });
  };

  useEffect(() => {
    const url = `https://api.ipbase.com/v2/info?apikey=ipb_live_m4mZj8PkTzXAwBHtDHb0mUiU8ZxUv8YZsIh297hD`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLocation(data);
        const currentTime = location?.data.timezone.current_time;
        const date = new Date(currentTime);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedTime = `${hours}:${minutes}`;
        setFormattedTime(formattedTime);

        let timeOfDay = "";
        if (hours >= 1 && hours < 12) {
          timeOfDay = "morning";
        } else if (hours === 12) {
          timeOfDay = "noon";
        } else if (hours >= 13 && hours < 17) {
          timeOfDay = "afternoon";
        } else if (hours >= 17 && hours < 20) {
          timeOfDay = "evening";
        } else {
          timeOfDay = "night";
        }

        setTimeOfDay(timeOfDay);
      });
  }, []);

  useEffect(() => {
    const url = `http://worldtimeapi.org/api/ip`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTime(data);
      });
  }, []);

  return (
    <main
      className={
        night
          ? "h-screen bg-cover bg-no-repeat bg-bg-mobile-day lg:bg-bg-desktop-day md:bg-bg-tablet-day"
          : "h-screen bg-cover bg-no-repeat bg-bg-mobile-night lg:bg-bg-desktop-night md:bg-bg-tablet-night"
      }
    >
      <section className="max-w-[1110px] mx-auto text-white flex flex-col justify-between h-screen">
        <div
          className={
            translate
              ? "text-start hidden items-start p-10"
              : "text-start flex items-start p-10"
          }
        >
          <div className="flex w-full md:w-auto md:block justify-between">
            {quotes ? (
              <div>
                <p className="w-72 md:w-[32rem] text-xs md:text-lg mb-8">
                  “{quotes[0].content}
                </p>
                <p className="font-bold text-lg">{quotes[0].author}</p>
              </div>
            ) : (
              <div>
                <p className="w-72 md:w-[32rem] text-xs md:text-lg mb-8">
                  “The science of operations, as derived from mathematics more
                  especially, is a science of itself, and has its own abstract
                  truth and value.
                </p>
                <p className="font-bold text-lg">Ada Lovelace</p>
              </div>
            )}
          </div>
          <div className="cursor-pointer" onClick={handleSearch}>
            <img src={refresh} alt="" />
          </div>
        </div>

        <div className="p-10">
          <div className="flex items-center gap-4">
            <div onClick={handleNight} className="cursor-pointer">
              {night ? <img src={sun} alt="" /> : <img src={moon} alt="" />}
            </div>
            <p className="text-xl uppercase">
              GOOD {timeOfDay}, IT’S CURRENTLY
            </p>
          </div>
          <div className="flex items-baseline">
            <p className="font-bold md:text-[150px] text-[100px]">
              {formattedTime}
            </p>
            <span className="font-light text-4xl">
              {location?.data.timezone.code}
            </span>
          </div>
          <div
            className="flex flex-col items-start gap-10 lg:gap-0 lg:flex-row 
          lg:items-center lg:justify-between"
          >
            <p className="font-bold text-2xl uppercase">
              in {location?.data.location.city.name},
              {location?.data.location.region.name}
            </p>
            <div className="flex items-center gap-2 bg-white rounded-full py-1 px-3 text-black">
              <button>{translate ? "LESS" : "MORE"}</button>
              <div onClick={handleTranslate} className="cursor-pointer">
                {translate ? (
                  <img src={arrowUp} alt="" className="w-10 h-10" />
                ) : (
                  <img src={arrowDown} alt="" className="w-10 h-10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${
          translate ? "bg-black/75 text-white backdrop-blur-sm" : "hidden"
        } ${night ? "bg-[#979797]/75 text-black" : ""} translate-y-[-21rem]`}
      >
        <div
          className="max-w-[1110px] mx-auto flex flex-col md:flex-row 
        justify-between p-10 text-start"
        >
          <div>
            <div className="my-10 flex items-center justify-between md:block">
              <p className="text-xs md:text-sm">CURRENT TIMEZONE</p>
              <h2 className="font-bold text-xl md:text-6xl">
                {time?.timezone}
              </h2>
            </div>
            <div className="flex items-center justify-between md:block">
              <p className="text-xs md:text-sm uppercase">Day of the year</p>
              <h2 className="font-bold text-xl md:text-6xl">
                {time?.day_of_year}
              </h2>
            </div>
          </div>
          <div
            className={
              night
                ? "hidden md:block h-64 w-[1px] bg-[#303030]"
                : "hidden md:block h-64 w-[1px] bg-[#979797]"
            }
          ></div>
          <div>
            <div className="my-10 flex items-center justify-between md:block">
              <p className="text-xs md:text-sm uppercase">Day of the week</p>
              <h2 className="font-bold text-xl md:text-6xl">
                {time?.day_of_week}
              </h2>
            </div>
            <div className="flex items-center justify-between md:block">
              <p className="text-xs md:text-sm uppercase">week number</p>
              <h2 className="font-bold text-xl md:text-6xl">
                {time?.week_number}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
