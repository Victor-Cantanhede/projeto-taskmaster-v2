import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {

    const navigate = useNavigate();

    // REDIRECIONAMENTOS
    function redirecionamentos(page) {
        if (page == 'cad') { navigate('/Home') }
        if (page == 'cons') { navigate('/Consulta') }
    }

    return (
        <div className='SideMenuContainer'>
                <div className='ShowMenu'>
                    <h1>Menu</h1>
                    <span className='IconButton'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></span>
                </div>
                <nav className='ContainerMenuOption'>
                    <ul>
                        <li onClick={() => redirecionamentos('cad')}><span>Cadastro</span></li>
                        <li onClick={() => redirecionamentos('cons')}><span>Consulta</span></li>
                        <li><span>Relatório</span></li>
                        <li><span>Ajuda</span></li>
                    </ul>
                </nav>
            </div>
    );
}

export default SideMenu;