import Table from "@/components/CBSE-Regulations/CbseRegulations";
import React from "react";

const dataArray = [
    { id: 1, name: "CBSE Affiliation Letter", url: "https://drive.google.com/file/d/16juQi-Yp440NYr9HizD9TrCFjweuxm7u/view?usp=sharing" },
    { id: 2, name: "SMC", url: "https://drive.google.com/file/d/1JG1P-iNxYf92-GXs4nGzuNjMwnZCw9wR/view?usp=sharing" },
    { id: 3, name: "Soceity Registration", url: "https://drive.google.com/file/d/19DsMYjciTpBp9XOnTG5MhwJIPus6p6w8/view?usp=sharing" },
    { id: 4, name: "Recognition Letter", url: "https://drive.google.com/file/d/1A-Ko2xOCWiPe70Zc64Xa0igHGrqcKTLV/view?usp=sharing" },
    { id: 5, name: "Fee Structure", url: "https://drive.google.com/file/d/17q6LNcmyezzzjFpkXreqEyv-1T8EwEuC/view?usp=sharing" },
    { id: 6, name: "Academic Calender", url: "https://drive.google.com/file/d/11ew7Iu12Cdwb_0f74NvRVXZQ0nxPxW6W/view?usp=sharing" },
    { id: 7, name: "BSC", url: "https://drive.google.com/file/d/1pLE_FzWVNSzt-hpXSIfJzHTGsEoIG219/view?usp=sharing" },
    { id: 8, name: "FIRE NOC", url: "https://drive.google.com/file/d/14O-SLoEkDmgpmp5479o1eKL_0Leh7aBY/view?usp=sharing" },
    { id: 9, name: "PTA ", url: "https://drive.google.com/file/d/1Z5T2cV1RlLQkHk0zZ4MqzvQXmX6chzqr/view?usp=sharing" },
    { id: 10, name: "WSC", url: "https://drive.google.com/file/d/1RywAjRT9jBzmCcctzVakesSStkPD9aAU/view?usp=sharing" },
    { id: 11, name: "NOC For Bhopal", url: "https://drive.google.com/file/d/1gHzwyHFoJE8U6RPOyuMd8NxSYZjJed-a/view?usp=sharing" },
    { id: 12, name: "SELF-CERTIFICATION PROFORMA", url: "https://drive.google.com/file/d/1Jb9hBJHA6c6d3OsDXZm8_SeIAeU92LD8/view?usp=sharing" },
    { id: 13, name: "MPD", url: "https://drive.google.com/file/d/18wFIw1s88iwya6nfLMJMpufssnnfszGq/view?usp=sharing" },
  ];

const ExampleTable = () => {
    return <Table data={dataArray} />;
  };
  export default ExampleTable;