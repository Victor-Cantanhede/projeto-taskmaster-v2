import { useRef, useState } from 'react';
import { v4 } from 'uuid';
import './Home.css';

function Home() {

    const tituloRef = useRef();
    const descricaoRef = useRef();
    const categoriaRef = useRef();
    const prazoRef = useRef();

    const [Demandas, setDemandas] = useState([]);

    // CADASTRANDO A DEMANDA
    function CadastrarTask(event) {
        event.preventDefault();

        // CONVERTENDO DATA PARA FORMATO PT-BR
        const formatDate = (dateString) => {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        }

        const titulo = tituloRef.current.value.toUpperCase();
        const descricao = descricaoRef.current.value;
        const categoria = categoriaRef.current.value;
        const dataInclusao = () => new Intl.DateTimeFormat('pt-br').format(new Date());
        const prazo = prazoRef.current.value;

        if (!titulo || !descricao || !categoria || !prazo) {
            window.alert('Preencha todos os campos!');
            console.log('Erro: Existem campos não preenchidos!');
            return;
        }

        console.log('Cadastrando a demanda...');

        setDemandas((Demandas) => ([...Demandas, {
            id: v4(),
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            dataInclusao: dataInclusao(),
            prazo: formatDate(prazo),
            isCompleted: false
        }]));

        tituloRef.current.value = '';
        descricaoRef.current.value = '';
        categoriaRef.current.value = '';
        prazoRef.current.value = '';

        console.log('Cadastro realizado com sucesso!');
    }

    // CONCLUINDO A DEMANDA
    function ConcluirTask(id, concluida) {
        if (concluida == false) {
            console.log('Concluindo a demanda...');
    
            setDemandas((Demandas) => 
                Demandas.map((Demandas) => 
                    Demandas.id == id ? {...Demandas, isCompleted: true} : Demandas
                )
            );
    
            console.log(`Demanda com o ID ${id} concluída com sucesso!`);

        } else {
            console.log('Reabrindo a demanda para tratativa...');

            setDemandas((Demandas) =>
                Demandas.map((Demandas) =>
                    Demandas.id == id ? {...Demandas, isCompleted: false} : Demandas
                )
            );

            console.log(`Demanda com o ID ${id} reaberta com sucesso!`);
        }
    }

    // EXCLUINDO A DEMANDA
    function ExcluirTask(id) {
        console.log('Excluindo a demanda...');

        setDemandas((Demandas) => Demandas.filter((Demandas) => (Demandas.id !== id)));
        console.log(`Demanda com o ID ${id} excluída com sucesso!`);
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

                        {/* FORM PARA CADASTRO DE DEMANDAS */}
                        <form action="" method="post" autoComplete='off' onSubmit={CadastrarTask} >

                            {/* INPUT TÍTULO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="ititulo">Título:</label>
                                <input type="text" name="titulo" id="ititulo" placeholder='Digite o título da tarefa...' ref={tituloRef} />
                            </div>

                            {/* INPUT DESCRIÇÃO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="idescricao">Descrição:</label>
                                <textarea name="descricao" id="idescricao" placeholder='Digite a descrição da tarefa...' ref={descricaoRef} ></textarea>
                            </div>
                            
                            {/* INPUT CATEGORIA */}
                            <div className='InputContainerForm'>
                                <label htmlFor="icategoria">Categoria:</label>
                                <select name="categoria" id="icategoria" defaultValue={""} ref={categoriaRef} >
                                    <option value="" disabled hidden >Selecione uma categoria</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Estudos">Estudos</option>
                                    <option value="Pessoal">Pessoal</option>
                                </select>
                            </div>

                            {/* INPUT PRAZO */}
                            <div className='InputContainerForm'>
                                <label htmlFor="iprazo">Prazo de entrega:</label>
                                <input type="date" name="prazo" id="iprazo" ref={prazoRef} />
                            </div>

                            {/* BUTTON CADASTRAR */}
                            <div className='btnContainerForm'>
                                <button type='submit'>Cadastrar</button>
                            </div>
                        </form>
                    </div>

                    {Demandas.map((Demandas) => (

                        /* PREVIEW DEMANDAS CADASTRADAS */
                        <div className='ContainerPreviewDemandas' key={Demandas.id}>
                            <div className='PreviewDemandas' style={{backgroundColor: Demandas.isCompleted ? 'rgba(0, 128, 0, 0.267)' : 'initial', transition: '0.3s'}}>
                                <div className='DemandaCadastrada'>
                                    <p>Título: {Demandas.titulo}</p>
                                    <p>Categoria: {Demandas.categoria}</p>
                                    <p>Descrição: {Demandas.descricao}</p>
                                    <p>Data de Inclusão: {Demandas.dataInclusao}</p>
                                    <p>Prazo: {Demandas.prazo}</p>

                                    <div className='btnActionsDemanda'>

                                        {/* BTN CONCLUIR */}
                                        <button id='btnConcluir' style={{backgroundColor: Demandas.isCompleted ? 'rgb(30, 104, 216, 0.623)' : 'rgb(0, 128, 0, 0.623)'}} onClick={() => ConcluirTask(Demandas.id, Demandas.isCompleted)}>{Demandas.isCompleted ? 'Reabrir' : 'Concluir'}</button>

                                        {/* BTN EDITAR */}
                                        <button id='btnEditar' style={{display: Demandas.isCompleted ? 'none' : 'block'}}>Editar</button>

                                        {/* BTN EXCLUIR */}
                                        <button id='btnExcluir' onClick={() => ExcluirTask(Demandas.id)}>{Demandas.isCompleted ? 'Arquivar' : 'Excluir'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;