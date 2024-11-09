import './SideMenu.css';

function SideMenu() {

    return (
        <div className='SideMenuContainer'>
                <div className='ShowMenu'>
                    <h1>Menu</h1>
                    <span className='IconButton'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></span>
                </div>
                <nav className='ContainerMenuOption'>
                    <ul>
                        <li><span>Cadastro</span></li>
                        <li><span>Consulta</span></li>
                        <li><span>Relatório</span></li>
                        <li><span>Ajuda</span></li>
                    </ul>
                </nav>
            </div>
    );
}

export default SideMenu;