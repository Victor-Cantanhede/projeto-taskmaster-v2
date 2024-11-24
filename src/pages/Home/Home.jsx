import { useRef, useState, useEffect } from 'react';
import { v4 } from 'uuid';
import SideMenu from '../../components/SideMenu/SideMenu';
import { EditSquareIco, CheckIco, DoneIco, DeleteIco, ArchiveIco, SaveIco, CancelIco } from '../../components/Icons';
import { OrbitProgress } from 'react-loading-indicators';
import { Checkmark } from 'react-checkmark';
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
    const [newCad, setNewCad] = useState(false);
    const [cadDemandasLoading, setCadDemandasLoading] = useState(false);

    // CADASTRANDO A DEMANDA
    function CadastrarTask(event) {
        event.preventDefault();
        
        // VARIÁVEIS DE FÁCIL ACESSO AOS VALORES DOS INPUTS
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

        // ALTERANDO O ESTADO DO ARRAY DEMANDAS (ADICIONANDO DEMANDA COMO NOVO OBJ)
        setDemandas((Demandas) => ([
            {
                id: v4(),
                titulo: titulo,
                descricao: descricao,
                categoria: categoria,
                dataInclusao: formatDate(dataInclusao),
                prazo: formatDate(prazo),
                diasParaEntrega: calcularDiferencaDias(dataInclusao, prazo),
                emAlteracao: false,
                isCompleted: false,
                inPreview: false,
                detalhesNaTela: false,
                isDeleted: false
            },
            ...Demandas
        ]));

        // ZERANDO VALORES DOS INPUTS
        tituloRef.current.value = '';
        descricaoRef.current.value = '';
        categoriaRef.current.value = '';
        prazoRef.current.value = '';

        // ALTERANDO ESTADO DE NEWCAD PARA QUE A ANIMAÇÃO DE LOADING CHECK SEJA APENAS NO CADASTRAMENTO
        setNewCad(true);
        setTimeout(() => {
            setNewCad(false);
        }, 4000);

        console.log('Cadastro realizado com sucesso!');
    }

    // ANIMAÇÃO DE INCLUIR DEMANDA NA TELA PREVIEW APÓS SEU CADASTRAMENTO
    function incluDemandaAnimation(id) {
        setDemandas((Demandas) =>
            Demandas.map((Demandas) =>
                Demandas.id === id ? { ...Demandas, inPreview: true } : Demandas
            ));
    }

    // CHAMANDO ANIMAÇÃO DE INCLUSÃO QUANDO NOVA DEMANDA É CADASTRADA
    useEffect(() => {
        Demandas.forEach((Demandas) => {
            if (!Demandas.inPreview) {
                setCadDemandasLoading(true);
                setTimeout(() => {
                    incluDemandaAnimation(Demandas.id);
                    setCadDemandasLoading(false);
                }, 2000);
            }
        });
    }, [Demandas]);

    // ANIMAÇÃO DE LOADING E CHECK QUANDO NOVA DEMANDA É CADASTRADA
    function CheckLoading() {
        if (cadDemandasLoading) {
            return (<OrbitProgress color='rgb(14, 55, 145)' style={{fontSize: '5px'}} />);

        } else if (!newCad) {
            return;

        } else {
            return (<span className='check'><Checkmark size='25px' /></span>);
        }
    }

    // CONCLUINDO OU REABRINDO A DEMANDA
    function ConcluirTask(id, concluida) {
        if (cadDemandasLoading) {
            return console.log('ERRO: Não é possível executar esta ação durante o cadastro de nova demanda!');
        }

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
        if (cadDemandasLoading) {
            return console.log('ERRO: Não é possível executar esta ação durante o cadastro de nova demanda!');
        }

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
        if (cadDemandasLoading) {
            return console.log('ERRO: Não é possível executar esta ação durante o cadastro de nova demanda!');
        }

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
        if (cadDemandasLoading) {
            return console.log('ERRO: Não é possível executar esta ação durante o cadastro de nova demanda!');
        }

        const confirmExclusao= window.confirm('Tem certeza que deseja excluir esta demanda?');

        if (!confirmExclusao) {
            return console.log('Exclusão cancelada!');
        }

        console.log('Excluindo demanda...');

        setDemandas((Demandas) => Demandas.map((Demandas) =>
            Demandas.id == id ? {...Demandas, isDeleted: true} : Demandas
        ));

        console.log(`Demanda com o ID ${id} excluída com sucesso!`);

        /* TESTE DE EXCLUSÃO PERMANENTE */
        /*setTimeout(() => {
            setDemandas((Demandas) => Demandas.filter((Demandas) => (Demandas.id !== id)));
            console.log(`Demanda com o ID ${id} excluída com sucesso!`);
        }, 4000);*/
    }

    // COMPONENTE PARA MOSTRAR AS INFORMAÇÕES DA DEMANDA
    function AlterarDemanda({Demandas}) {
        
        // HABILITANDO INPUTS PARA EDIÇÃO DA DEMANDA DENTRO DO PRÓPRIO ELEMENTO HTML
        // AS ALTERAÇÕES SÓ SERÃO PERMITIDAS CASO A FUNÇÃO "EditarDemanda" SEJA CHAMADA
        if (Demandas.emAlteracao == false) {
            return (
                <>
                    <p><strong>Título:</strong> {Demandas.titulo}</p>
                    <p><strong>Categoria:</strong> {Demandas.categoria}</p>
                    <p><strong>Descrição:</strong> {Demandas.descricao}</p>
                    <br />
                    <p><strong>Data de Inclusão:</strong> {Demandas.dataInclusao}</p>
                    <p><strong>Prazo:</strong> {Demandas.prazo} {Demandas.diasParaEntrega}</p>
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
            <SideMenu />
            <div className='GerenciadorMainContainer'>
                <div className='FormCadTask'>
                    <div className='FormCadTask-cabecalho'>
                        <h1>Cadastro de demandas</h1>
                    </div>
                    <div className='FormCadTaks-PreviewDemandas'>
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
                                    <CheckLoading />
                                </div>
                            </form>
                        </div>
                        <div>
                            {Demandas.map((Demandas) => (

                                // PREVIEW DEMANDAS CADASTRADAS
                                <div className={Demandas.inPreview ? Demandas.isDeleted ? 'ContainerPreviewDemandasDeletedAnimation' : 'ContainerPreviewDemandasAnimation' : 'ContainerPreviewDemandas'} key={Demandas.id}>

                                    <div className='PreviewDemandas' style={{opacity: Demandas.isCompleted ? '0.8' : '1', backgroundColor: Demandas.isCompleted ? 'rgba(0, 255, 0, 0.171)' : 'initial', border: Demandas.emAlteracao ? '1px solid rgb(30, 104, 216, 0.623)' : '1px solid rgba(128, 128, 128, 0.185)', transition: '0.3s'}}>

                                        <div className='DemandaCadastrada'>

                                            {/* INFORMAÇÕES DA DEMANDA (QUE PODEM SER ALTERADAS CLICANDO NO BTN EDITAR) */}
                                            <AlterarDemanda Demandas={Demandas} />
                                            
                                            <div className='btnActionsDemanda'>

                                                {/* BTN CONCLUIR */}
                                                <button title={Demandas.isCompleted ? 'Reabrir' : 'Concluir'} id='btnConcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => ConcluirTask(Demandas.id, Demandas.isCompleted)}>{Demandas.isCompleted ? <DoneIco /> : <CheckIco />}</button>

                                                {/* BTN SALVAR ALTERAÇÕES (APÓS CLICAR NO BTN EDITAR) */}
                                                <button title='Salvar' id='btnSalvarAlteracoes' style={{display: Demandas.emAlteracao ? 'block' : 'none'}} onClick={() => SalvarAlteracoes(Demandas.id)}><SaveIco /></button>

                                                {/* BTN EDITAR */}
                                                <button title={Demandas.emAlteracao ? 'Cancelar alteração' : 'Editar'} id='btnEditar' style={{display: Demandas.isCompleted ? 'none' : 'block', backgroundColor: Demandas.emAlteracao ? 'rgba(255, 0, 0, 0.623)' : 'rgb(14, 55, 145)'}} onClick={() => EditarDemanda(Demandas.id, Demandas.emAlteracao)}>{Demandas.emAlteracao ? <CancelIco /> : <EditSquareIco />}</button>

                                                {/* BTN EXCLUIR */}
                                                <button title={Demandas.isCompleted ? 'Arquivar' : 'Excluir'} id='btnExcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => ExcluirTask(Demandas.id)}>{Demandas.isCompleted ? <ArchiveIco /> : <DeleteIco />}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;