import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline.js"
import  Menu  from "../src/components/Menu.js"

function HomePage() {
  const estilospage = {
    // backgroundColor: "BlueViolet",
    // borderRadius: "5px",
    // padding: "8px",
  };
  console.log(config.playlists);
  return (
    <>
      <CSSReset />
      <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,   
                // backgroundColor: "BlueViolet"             
                
            }}>            
        <Menu />
        <Header />
        <TimeLine playlists={config.playlists}>Conteudo</TimeLine>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
// }

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid turquoise;
  }
  .user-info {
    margin-top:50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
function Header() {
  return (
    <StyledHeader>
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <h2>{config.name}</h2>
        <p style={{textDecoration:'underline'}}>{config.job}</p>
      </section>
    </StyledHeader>
  );
}

function TimeLine(props) {
  const playlistsNames = Object.keys(props.playlists);
  return (
    <StyledTimeline >
      {playlistsNames.map((playlistsName) => {
        const videos = props.playlists[playlistsName];
        return (
          <section>
            <h2>{playlistsName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
