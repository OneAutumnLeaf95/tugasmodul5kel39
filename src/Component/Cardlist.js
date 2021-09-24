import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, Grid } from "@material-ui/core";
import { useContext, createContext } from "react";
import '../App.css';

import 'antd/dist/antd.css';

const themes = {
  light: {
      background: "#FFFFFF",
      color: "#000000"
  },
  dark: {
      background: "rgb(40, 44, 52)",
      color: "white",
  },
};

const ThemeContext = createContext();

function Content(props) {
  return (
      <div>
          <Text />
      </div>
  );
}

function Text(props) {
  const theme = useContext(ThemeContext);
  console.log("[context value]", theme);
  return <p className="titlecontext" style={{ color: theme.color }}></p>;
}

export default function Cardlist() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [db, setDb] = useState(false);
  const [valueTheme, setValueTheme] = useState(themes.light); //use State

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/user",
      headers: {
        accept: "/",
      },
    })
      .then((data) => {
        console.log('data',data.data);
        setDb(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="margin"><center>Tugas Modul 5 Kelompok 39</center> </h1>
      </div>
      <div>
        <ThemeContext.Provider value={valueTheme}>
          <div
            style={{
              backgroundColor: valueTheme.background,
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
              position: "relative",
              top: "-1.3em",
              overflowY: "hidden",
              maxHeight: "100%",
            }}
          >
            <ThemeContext.Provider value={valueTheme}>
              <div className="contentWrapper" style={{ backgroundColor: valueTheme.background }}>
                  
                <Grid
                  container
                  md={7}
                  spacing={3}
                  style={{ margin:"auto" }}
          
                >
                  {db.length > 0 && db.map((results, index) => 
                    (
                      <Grid item key={results.id} md={5}>
                        <Card>
                          <CardActionArea onClick={showModal}>
                            <CardContent>
                              <Typography>Nama: {results.name}</Typography>
                              <Typography>NIM: {results.nim}</Typography>
                              <Typography>Alamat: {results.address}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
                <Content />
                  <button className="Button" onClick={() => setValueTheme(valueTheme === themes.light ? themes.dark : themes.light)}>
                    Ganti Tema
                  </button>
              </div>
            </ThemeContext.Provider>

            <div>{/* <SectionContext /> */}</div>
          </div>
        </ThemeContext.Provider>
        {/* <Axio /> */}
      </div>

      <Modal title="Deskripsi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <p>Halloo...!</p>
      </Modal>
    </>
  );
}