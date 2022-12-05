import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ActiveLotTable from "../components/ActiveLotTable";

const Home = () => {
  return (
    <>
      <ActiveLotTable />
    </>
  );
};

export default Home;
