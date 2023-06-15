import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {};

interface TimeProps {
  serverData: number;
}

export const getServerSideProps: GetServerSideProps<TimeProps> = async () => {
  const serverTimesDate = new Date();
  const serverTimes = serverTimesDate.getTime()
  return {
    props: {
      serverData: serverTimes,
    },
  };
};


const Home: React.FC<TimeProps> = ({serverData}) => {
  const [timeDifference, setTimeDifference] = useState<number|null>(null);
  const router = useRouter();

  useEffect(()=>{
    const currentTime = new Date();
    const currentTimeNumber = currentTime.getTime()
    if (typeof serverData == "number") {
      setTimeDifference(Math.abs(serverData-currentTimeNumber))
    }
  },[serverData])

  const formatTimeDifference = (difference:number) => {
    // Convertir la différence en jours, heures, minutes et secondes
    const seconds = Math.floor(difference / 1000) % 60;
    const minutes = Math.floor(difference / (1000 * 60)) % 60;
    const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return ` ${days} jours, ${hours} heures, ${minutes} minutes, ${seconds} secondes`;
  };

  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{" " + serverData!=null ? formatTimeDifference(serverData):" " }</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{" " +  timeDifference == null ?" it's null ": formatTimeDifference(timeDifference??0)}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export default Home;