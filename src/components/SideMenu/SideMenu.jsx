import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
    
    // REDIRECIONAMENTOS
    const navigate = useNavigate();

    function redirecionamentos(page) {
        if (page == 'cad') { navigate('/Home') }
        if (page == 'cons') { navigate('/Consulta') }
    }

    // ABRIR/FECHAR MENU
    const [MenuEnable, setMenuEnable] = useState(true);

    function OpenCloseMenu() {
        if (MenuEnable == true) {
            setMenuEnable(false);

        } else {
            setMenuEnable(true);
        }
    }

    return (
        <div className={MenuEnable ? 'SideMenuContainer' : 'SideMenuContainerClosed'}>
            <div className='ShowMenu'>
                <h1>Menu</h1>
                <span onClick={OpenCloseMenu} className='IconButton'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></span>
            </div>
            <nav className={MenuEnable ? 'ContainerMenuOption' : 'ContainerMenuOptionClosed'}>
                <ul>
                    <li className={MenuEnable ? '' : 'liClosed'} onClick={() => redirecionamentos('cad')}><span>Cadastro</span></li>
                    <li className={MenuEnable ? '' : 'liClosed'} onClick={() => redirecionamentos('cons')}><span>Consulta</span></li>
                    <li className={MenuEnable ? '' : 'liClosed'}><span>Relatório</span></li>
                    <li className={MenuEnable ? '' : 'liClosed'}><span>Ajuda</span></li>
                </ul>
            </nav>
        </div>
    );
}

export default SideMenu;