import { useRef, useState } from 'react';
import { v4 } from 'uuid';
import './Home.css';

function Home() {

    const tituloRef = useRef();
    const descricaoRef = useRef();
    const categoriaRef = useRef();
    const prazoRef = useRef();

    const newTituloRef = useRef();
    const newDescricaoRef = useRef();
    const newCategoriaRef = useRef();
    
    const [Demandas, setDemandas] = useState([]);

    // CADASTRANDO A DEMANDA
    function CadastrarTask(event) {
        event.preventDefault();
        
        const titulo = tituloRef.current.value.toUpperCase();
        const descricao = descricaoRef.current.value;
        const categoria = categoriaRef.current.value;
        const dataInclusao = new Date();
        const prazo = new Date(`${prazoRef.current.value}T00:00`);

        // VERIFICANDO SE TODOS OS CAMPOS FORAM PREENCHIDOS
        if (!titulo || !descricao || !categoria || !prazo) {
            window.alert('Preencha todos os campos!');
            console.log('Erro: Existem campos não preenchidos!');
            return;
        }

        // FUNÇÃO PARA CONVERTER DATA PARA FORMATO PT-BR
        const formatDate = (date) => date.toLocaleDateString('pt-br');

        // CALCULANDO DIFERENÇA DE DIAS ENTRE PRAZO E DIA ATUAL
        const calcularDiferencaDias = (dataInicio, dataFim) => {
            const diffTime = new Date(dataFim) - new Date(dataInicio);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 *24)); // Convertendo valor de ms para dia
            return diffDays === 1 ? '(1 dia)' : `(${diffDays} dias)`;
        };

        console.log('Cadastrando a demanda...');

        // ALTERANDO O ESTADO DO ARRAY DEMANDAS
        setDemandas((Demandas) => ([...Demandas, {
            id: v4(),
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            dataInclusao: formatDate(dataInclusao),
            prazo: formatDate(prazo),
            diasParaEntrega: calcularDiferencaDias(dataInclusao, prazo),
            emAlteracao: false,
            isCompleted: false
        }]));

        // ZERANDO VALORES DOS INPUTS
        tituloRef.current.value = '';
        descricaoRef.current.value = '';
        categoriaRef.current.value = '';
        prazoRef.current.value = '';

        console.log('Cadastro realizado com sucesso!');
    }

    // CONCLUINDO A DEMANDA
    function ConcluirTask(id, concluida) {
        if (concluida == false) {
            console.log('Concluindo demanda...');
            
            setDemandas((Demandas) => 
                Demandas.map((Demandas) => 
                    Demandas.id == id ? {...Demandas, isCompleted: true} : Demandas
            ));
    
            console.log(`Demanda com o ID ${id} concluída com sucesso!`);

        } else {
            console.log('Reabrindo demanda para tratativa...');

            setDemandas((Demandas) =>
                Demandas.map((Demandas) =>
                    Demandas.id == id ? {...Demandas, isCompleted: false} : Demandas
            ));

            console.log(`Demanda com o ID ${id} reaberta com sucesso!`);
        }
    }

    // PERMITINDO EDIÇÃO DA DEMANDA
    function EditarDemanda(id, emAlteracao) {
        if (emAlteracao == false) {
            console.log('Editando demanda...');

            setDemandas((Demandas) =>
                Demandas.map((Demandas) =>
                    Demandas.id == id ? {...Demandas, emAlteracao: true} : {...Demandas, emAlteracao: false}
            ));

        } else {
            console.log('Alteração cancelada!');

            setDemandas((Demandas) =>
                Demandas.map((Demandas) =>
                    Demandas.id == id ? {...Demandas, emAlteracao: false} : Demandas
            ));
        }
    }

    // SALVANDO ALTERAÇÕES DA DEMANDA
    function SalvarAlteracoes(id) {
        const confirmAlteracao= window.confirm('Tem certeza que deseja salvar as alterações?');

        if (!confirmAlteracao) {
            return console.log('Alteração cancelada!');
        }

        console.log('Salvando alterações...');

        const newTitulo = newTituloRef.current.value.toUpperCase();
        const newDescricao = newDescricaoRef.current.value;
        const newCategoria = newCategoriaRef.current.value;

        setDemandas((Demandas) =>
            Demandas.map((Demandas) =>
                Demandas.id == id ? {...Demandas, titulo: newTitulo, descricao: newDescricao, categoria: newCategoria, emAlteracao: false} : Demandas
        ));

        console.log(`Demanda com o ID ${id} alterada com sucesso!`);
    }

    // EXCLUINDO A DEMANDA
    function ExcluirTask(id) {
        const confirmExclusao= window.confirm('Tem certeza que deseja excluir esta demanda?');

        if (!confirmExclusao) {
            return console.log('Exclusão cancelada!');
        }

        console.log('Excluindo demanda...');

        setDemandas((Demandas) => Demandas.filter((Demandas) => (Demandas.id !== id)));
        console.log(`Demanda com o ID ${id} excluída com sucesso!`);
    }

    // COMPONENTE PARA MOSTRAR AS INFORMAÇÕES DA DEMANDA
    function AlterarDemanda({Demandas}) {
        
        // HABILITANDO INPUTS PARA EDIÇÃO DA DEMANDA DENTRO DO PRÓPRIO ELEMENTO HTML
        // AS ALTERAÇÕES SÓ SERÃO PERMITIDAS CASO A FUNÇÃO "EditarDemanda" SEJA CHAMADA
        if (Demandas.emAlteracao == false) {
            return (
                <>
                    <p>Título: {Demandas.titulo}</p>
                    <p>Categoria: {Demandas.categoria}</p>
                    <p>Descrição: {Demandas.descricao}</p>
                    <br />
                    <p>Data de Inclusão: {Demandas.dataInclusao}</p>
                    <p>Prazo: {Demandas.prazo} {Demandas.diasParaEntrega}</p>
                </>
            );

        } else {
            return (
                <div className='InputContainerForm' style={{padding: '0'}}>
                    <p>Título:
                        <br />
                        <input type="text" name="nTitulo" id="inTitulo" defaultValue={Demandas.titulo} ref={newTituloRef} />
                    </p>
                    <p>Categoria:
                        <br />
                        <select name="ncategoria" id="incategoria" defaultValue={Demandas.categoria} ref={newCategoriaRef} >
                            <option value="" disabled hidden >Selecione uma categoria</option>
                            <option value="Trabalho">Trabalho</option>
                            <option value="Estudos">Estudos</option>
                            <option value="Pessoal">Pessoal</option>
                        </select>
                    </p>
                    <p>Descrição:
                        <br />
                        <textarea name="ndescricao" id="indescricao" defaultValue={Demandas.descricao} ref={newDescricaoRef} />
                    </p>
                    <p>Data de Inclusão: {Demandas.dataInclusao}</p>
                    <p>Prazo: {Demandas.prazo} {Demandas.diasParaEntrega}</p>
                </div>
            );
        }
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
                                <textarea name="descricao" id="idescricao" placeholder='Digite a descrição da tarefa...' ref={descricaoRef} />
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
                            <div className='PreviewDemandas' style={{backgroundColor: Demandas.isCompleted ? 'rgba(0, 128, 0, 0.267)' : 'initial', border: Demandas.emAlteracao ? '1px solid white' : '1px solid rgba(128, 128, 128, 0.185)', transition: '0.3s'}}>
                                <div className='DemandaCadastrada'>

                                    {/* INFORMAÇÕES DA DEMANDA (QUE PODEM SER ALTERADAS CLICANDO NO BTN EDITAR) */}
                                    <AlterarDemanda Demandas={Demandas} />

                                    <div className='btnActionsDemanda'>

                                        {/* BTN CONCLUIR */}
                                        <button id='btnConcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block', backgroundColor: Demandas.isCompleted ? 'rgb(30, 104, 216, 0.623)' : 'rgb(0, 128, 0, 0.623)'}} onClick={() => ConcluirTask(Demandas.id, Demandas.isCompleted)}>{Demandas.isCompleted ? 'Reabrir' : 'Concluir'}</button>

                                        {/* BTN SALVAR ALTERAÇÕES (APÓS CLICAR NO BTN EDITAR) */}
                                        <button id='btnSalvarAlteracoes' style={{display: Demandas.emAlteracao ? 'block' : 'none'}} onClick={() => SalvarAlteracoes(Demandas.id)}>Salvar</button>

                                        {/* BTN EDITAR */}
                                        <button id='btnEditar' style={{display: Demandas.isCompleted ? 'none' : 'block', backgroundColor: Demandas.emAlteracao ? 'rgba(255, 0, 0, 0.623)' : 'rgb(30, 104, 216, 0.623)'}} onClick={() => EditarDemanda(Demandas.id, Demandas.emAlteracao)}>{Demandas.emAlteracao ? 'Cancelar' : 'Editar'}</button>

                                        {/* BTN EXCLUIR */}
                                        <button id='btnExcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => ExcluirTask(Demandas.id)}>{Demandas.isCompleted ? 'Arquivar' : 'Excluir'}</button>
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