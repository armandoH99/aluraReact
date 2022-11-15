function HomePage() {
    const message = 'welcome armando'
    const estilospage = {backgroundColor:'BlueViolet'}
    return (
    <div style={estilospage}>{message}
    <Menu />
    <Header />
    <TimeLine   />
    </div>
    )
}

export default HomePage

function Menu() {
    return (
        <div>
            <img src="D:\projects\aluraReact\public\betrayal.jpg"/>
            <img src="public\men-depression-drinking-tw.jpg"/>
            menu
        </div>
    )
}

function Header() {
    return (
        <div>
            header
        </div>
    )
}

function TimeLine() {
    return (
        <div>
            TimeLine
        </div>
    )
}