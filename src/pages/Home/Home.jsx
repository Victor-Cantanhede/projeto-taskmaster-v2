import './Home.css';

function Home() {

    function CadastrarTask(event) {
        event.preventDefault();
        console.log('Cadastro realizado com sucesso!');
    }

    return (
        <div className='homeContainer'>
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
            <div className='GerenciadorMainContainer'>
                <div className='FormCadTask'>
                    <div className='FormCadTask-cabecalho'>
                        <h1>Cadastro de demandas</h1>
                    </div>
                    <div className='ContainerFormCad'>
                        <form action="" method="post" autoComplete='off' onSubmit={CadastrarTask} >

                            {/* INPUT TÍTULO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="ititulo">Título:</label>
                                <input type="text" name="titulo" id="ititulo" placeholder='Digite o título da tarefa...' />
                            </div>

                            {/* INPUT DESCRIÇÃO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="idescricao">Descrição:</label>
                                <textarea name="descricao" id="idescricao" placeholder='Digite a descrição da tarefa...' ></textarea>
                            </div>
                            
                            {/* INPUT CATEGORIA */}
                            <div className='InputContainerForm'>
                                <label htmlFor="icategoria">Categoria:</label>
                                <select name="categoria" id="icategoria" defaultValue={""}>
                                    <option value="" disabled hidden >Selecione uma categoria</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Estudos">Estudos</option>
                                    <option value="Pessoal">Pessoal</option>
                                </select>
                            </div>

                            {/* INPUT PRAZO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="iprazo">Prazo de entrega:</label>
                                <input type="date" name="prazo" id="iprazo" />
                            </div>

                            {/* BUTTON CADASTRAR */}
                            <div className='btnContainerForm'>
                                <button type='submit'>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;