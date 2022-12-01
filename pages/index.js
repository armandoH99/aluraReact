import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline.js";
import Menu from "../src/components/Menu/";
import { videoService } from "../src/services/videoService.js";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid turquoise;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
const StyledBanner = styled.div`
  background-color: BlueViolet;
  /* background-image: url(${config.bn}); */
  background-image: url(${({ bg }) => bg});

  height: 230px;
`;
const PROJECT_URL = "https://jmobredsdkxekxfivrtw.supabase.co";
const PROJECT_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptb2JyZWRzZGt4ZWt4Zml2cnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4NTg0NTMsImV4cCI6MTk4NTQzNDQ1M30.eGLLcccX5W9J4JIqtPuI_elmtQrbqM8dv5fDGhCkGhY";
const suprabase = createClient(PROJECT_URL, PROJECT_KEY);

function HomePage() {
  const service = videoService();
  const [filterValue, setFilterValue] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    // console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
          // console.log("dados=>",dados.data);
      const novasPlaylists = {};
      dados.data.forEach((video) => {      
        if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
        novasPlaylists[video.playlist] = [
          video,
          ...novasPlaylists[video.playlist],
                ];
            });

            setPlaylists(novasPlaylists);
    });
  }, []);
  // console.log("hey", playlists);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          //backgroundColor: "BlueViolet"
        }}
      >
        <Menu searchValue={filterValue} changeSearchValue={setFilterValue} />
        <Header />

        <TimeLine searchValue={filterValue} playlists={playlists}>
          Conteudo
        </TimeLine>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bn} />
      {/* <StyledBanner bg={config.bn} />     */}
      {/* <StyledBanner bg={config.bn} />     */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <h2>{config.name}</h2>
        <p style={{ textDecoration: "underline" }}>{config.job}</p>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistsName) => {
        const videos = props.playlists[playlistsName];
        return (
          <section key={playlistsName}>
            <h2>{playlistsName}</h2>
            <div>
              {videos
                .filter((video) => {
                  return video.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
