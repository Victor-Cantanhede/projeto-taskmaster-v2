import { useRef, useState } from 'react';
import SideMenu from '../../components/SideMenu/SideMenu';
import { EditSquareIco, EyeIco, CheckIco, DoneIco, DeleteIco, ArchiveIco, SaveIco, CancelIco } from '../../components/Icons';
import './Consulta.css';

function Consulta() {

    const consultaTituloRef = useRef();
    const consultaCategoriaRef = useRef();
    const consultaDataInicialRef = useRef();
    const consultaDataFinalRef = useRef();
    const consultaPrazoRef = useRef();

    const newTituloRef = useRef();
    const newDescricaoRef = useRef();
    const newCategoriaRef = useRef();
    
    // SIMULANDO DEMANDAS JÁ CADASTRADAS EM BANCO DE DADOS
    const [Demandas, setDemandas] = useState([
        {
            id: 1,
            titulo: 'TITULO-TESTE-001',
            descricao: 'Descrição-teste-001',
            categoria: 'Trabalho',
            dataInclusao: '01/11/2024',
            prazo: '20/11/2024',
            diasParaEntrega: '(50 dias)',
            emAlteracao: false,
            isCompleted: false,
            inPreview: true,
            detalhesNaTela: false,
            isDeleted: false
        },
        {
            id: 2,
            titulo: 'TITULO-TESTE-002',
            descricao: 'Descrição-teste-002',
            categoria: 'Pessoal',
            dataInclusao: '02/11/2024',
            prazo: '21/11/2024',
            diasParaEntrega: '(50 dias)',
            emAlteracao: false,
            isCompleted: false,
            inPreview: true,
            detalhesNaTela: false,
            isDeleted: false
        },
        {
            id: 3,
            titulo: 'TITULO-TESTE-003',
            descricao: 'Descrição-teste-003',
            categoria: 'Estudos',
            dataInclusao: '03/11/2024',
            prazo: '22/11/2024',
            diasParaEntrega: '(50 dias)',
            emAlteracao: false,
            isCompleted: false,
            inPreview: true,
            detalhesNaTela: false,
            isDeleted: false
        }
    ]);

    // ARMAZENANDO VALOR INSERIDO NOS CAMPOS DE INPUT PARA FILTRAR AS DEMANDAS
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroDataInicial, setFiltroDataInicial] = useState('');
    const [filtroDataFinalInclusao, setFiltroDataFinalInclusao] = useState('');
    const [filtroPrazo, setFiltroPrazo] = useState('');

    // LIMPANDO VALOR INSERIDO NOS CAMPOS DE INPUT PARA FILTRAR AS DEMANDAS
    const LimparFiltros = () => {
        setFiltroTitulo('');
        setFiltroCategoria('');
        setFiltroDataInicial('');
        setFiltroDataFinalInclusao('');
        setFiltroPrazo('');
    }

    // FILTRANDO AS DEMANDAS DE ACORDO COM OS FILTROS (INPUT)
    const DemandasFiltradas = Demandas.filter((demanda) => {

        // CONVERTENDO A DATA DE INCLUSÃO DA DEMANDA DE STRING PARA OBJETO DATE
        // ISTO PERMITE FAZER CÁLCULOS E COMPARAÇÕES ENTRE AS DATAS
        const dataInclusao = new Date(demanda.dataInclusao.split('/').reverse().join('-'));

        // CONVERTENDO A DATA INICIAL E FINAL DO FILTRO PARA OBJETO DATE (OU null SE NÃO TIVER VALOR)
        const dataInicial = filtroDataInicial ? new Date(filtroDataInicial.split('/').reverse().join('-')) : null;
        const dataFinal = filtroDataFinalInclusao ? new Date(filtroDataFinalInclusao.split('/').reverse().join('-')) : null;

        // VERIFICANDO SE OS DEMAIS VALORES DA DEMANDA CONTÉM O VALOR INSERIDO NO FILTRO DE TÍTULO
        const tituloValido = demanda.titulo.toUpperCase().includes(filtroTitulo.toUpperCase());
        const categoriaValida = demanda.categoria.includes(filtroCategoria);
        const prazoValido = demanda.prazo.includes(filtroPrazo);
    
        // VERIFICANDO SE A DATA DE INCLUSÃO DA DEMANDA ESTÁ DENTRO DO INTERVALO ESPECIFICADO
        const dataValida = (!dataInicial || dataInclusao >= dataInicial) && (!dataFinal || dataInclusao <= dataFinal);
    
        // SOMENTE AS DEMANDAS QUE ATENDEM A TODAS AS CONDIÇÕES (TÍTULO, CATEGORIA, PRAZO E INTERVALO DE DATAS) SERÃO INCLUÍDAS NO ARRAY FINAL.
        return tituloValido && categoriaValida && dataValida && prazoValido;
    });

    // CONCLUINDO OU REABRINDO A DEMANDA
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

    // FUNÇÃO PARA DETALHAR A DEMANDA NA TELA
    function MostrarDetalhes(id) {

        setDemandas((Demandas) => Demandas.map((Demandas) =>
            Demandas.id == id ? {...Demandas, detalhesNaTela: true} : Demandas
        ));
    }

    function OcultarDetalhes(id) {

        setDemandas((Demandas) => Demandas.map((Demandas) =>
            Demandas.id == id ? {...Demandas, detalhesNaTela: false} : Demandas
        ));
    }

    function DetalharDemanda({Demandas}) {

        if (Demandas.detalhesNaTela) {
            return (
                <div className='backContainerDetalharDemanda'>
                    <div className='ContainerDetalharDemanda'>
                        <button id='closeDetalhesBtn' onClick={() => OcultarDetalhes(Demandas.id)}><CancelIco /></button>
                        <div className='ContainerIntDetalharDemanda'>
                            <p><strong>Título:</strong> {Demandas.titulo}</p>
                            <p><strong>Categoria:</strong> {Demandas.categoria}</p>
                            <p><strong>Data de Inclusão:</strong> {Demandas.dataInclusao}</p>
                            <p><strong>Prazo:</strong> {Demandas.prazo} {Demandas.diasParaEntrega}</p>
                            <p><strong>Descrição:</strong></p>
                            <div id='detalhesDescricao'>
                                <p>{Demandas.descricao}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    function InfDemandas({Demandas}) {

        // HABILITANDO INPUTS PARA EDIÇÃO DA DEMANDA DENTRO DO PRÓPRIO ELEMENTO HTML
        // AS ALTERAÇÕES SÓ SERÃO PERMITIDAS CASO A FUNÇÃO "EditarDemanda" SEJA CHAMADA
        if (Demandas.emAlteracao == false) {
            return (
                <div>
                    <p><strong>Título:</strong> {Demandas.titulo}</p>
                    <p><strong>Categoria:</strong> {Demandas.categoria}</p>
                    <p><strong>Data de Inclusão:</strong> {Demandas.dataInclusao}</p>
                    <p><strong>Prazo:</strong> {Demandas.prazo} {Demandas.diasParaEntrega}</p>
                </div>
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
                <div className='ContainerConsultaTask'>
                    <div className='ConsultaTask-cabecalho'>
                        <h1>Consulta de Demandas</h1>
                    </div>
                    <div className='ContainerFiltro'>
                        <div className='ContainerInputFiltros'>

                            {/* FORM PARA CONSULTA DE DEMANDAS */}
                            <form action="" method="get" autoComplete='off' onSubmit={InfDemandas} >

                                {/* INPUT TÍTULO */}
                                <div className='InputContainerForm'>
                                    <label htmlFor="ititulo">Título:</label>
                                    <input type="text" name="titulo" id="ititulo" placeholder='Digite o título da tarefa...' ref={consultaTituloRef} onChange={(event) => setFiltroTitulo(event.target.value)} />
                                </div>
                        
                                {/* INPUT CATEGORIA */}
                                <div className='InputContainerForm'>
                                    <label htmlFor="icategoria">Categoria:</label>
                                    <select name="categoria" id="icategoria" defaultValue={""} ref={consultaCategoriaRef} onChange={(event) => setFiltroCategoria(event.target.value)} >
                                        <option value="" disabled hidden >Selecione uma categoria</option>
                                        <option value="Trabalho">Trabalho</option>
                                        <option value="Estudos">Estudos</option>
                                        <option value="Pessoal">Pessoal</option>
                                    </select>
                                </div>

                                {/* INPUT PRAZO */}
                                <div className='InputContainerForm' id='InputContainerForm-prazos'>

                                    <div className='ContainerPeriodoInclusao'>
                                        <label htmlFor="idataInclusao">Período de inclusão:</label>
                                        <div className='PeriodoInclusao'>

                                            <input type="date" name="dataInclusao" id="idataInclusao" ref={consultaDataInicialRef} onChange={(event) => setFiltroDataInicial(new Date(`${event.target.value}T00:00`).toLocaleDateString('pt-br'))} />

                                            <p>até</p>

                                            <input type="date" name="dataFinalInclusao" id="idataFinalInclusao" ref={consultaDataFinalRef} onChange={(event) => setFiltroDataFinalInclusao(new Date(`${event.target.value}T00:00`).toLocaleDateString('pt-br'))} />
                                        </div>
                                    </div>

                                    <div className='ContainerPrazoEntrega'>
                                        <label htmlFor="iprazo">Prazo de entrega:</label>
                                        <input type="date" name="prazo" id="iprazo" ref={consultaPrazoRef} onChange={(event) => setFiltroPrazo(new Date(`${event.target.value}T00:00`).toLocaleDateString('pt-br'))} />
                                    </div>
                                </div>

                                {/* BUTTON LIMPAR FILTROS */}
                                <div className='btnContainerForm'>
                                    <button type='reset' onClick={LimparFiltros}>Limpar</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {DemandasFiltradas.map((Demandas) => (
                                
                                // CONSULTA TODAS AS DEMANDAS
                                <div className={Demandas.inPreview ? Demandas.isDeleted ? 'ContainerPreviewDemandasDeletedAnimation' : 'ContainerPreviewDemandasAnimation' : 'ContainerPreviewDemandas'} key={Demandas.id}>

                                    <div className='ConsultaDemandaCadastrada' style={{opacity: Demandas.isCompleted ? '0.8' : '1', backgroundColor: Demandas.isCompleted ? 'rgba(0, 255, 0, 0.171)' : 'initial', border: Demandas.emAlteracao ? '1px solid rgb(30, 104, 216, 0.623)' : '1px solid rgba(128, 128, 128, 0.185)', transition: '0.3s'}}>
                                        
                                        <div className={Demandas.emAlteracao ? 'InfoDemandaEdit' : 'InfoDemanda'}>

                                            {/* INFORMAÇÕES DA DEMANDA (QUE PODEM SER ALTERADAS CLICANDO NO BTN EDITAR) */}
                                            <InfDemandas Demandas={Demandas} />
                                            
                                            {/* DETALHES DA DEMANDA (SERÃO MOSTRADOS AO CLICAR NO BTN VISUALIZAR) */}
                                            <DetalharDemanda Demandas={Demandas} />
                                            
                                            <div className='btnActionsDemanda'>
                                                
                                                {/* BTN CONCLUIR */}
                                                <button title={Demandas.isCompleted ? 'Reabrir' : 'Concluir'} id='btnConcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => ConcluirTask(Demandas.id, Demandas.isCompleted)}>{Demandas.isCompleted ? <DoneIco /> : <CheckIco />}</button>

                                                {/* BTN VISUALIZAR DETALHES */}
                                                <button title='Detalhar' id='btnVisualizar' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => MostrarDetalhes(Demandas.id)}><EyeIco /></button>

                                                {/* BTN SALVAR ALTERAÇÕES (APÓS CLICAR NO BTN EDITAR) */}
                                                <button title='Salvar' id='btnSalvarAlteracoes' style={{display: Demandas.emAlteracao ? 'block' : 'none'}} onClick={() => SalvarAlteracoes(Demandas.id)}><SaveIco /></button>

                                                {/* BTN EDITAR */}
                                                <button title={Demandas.emAlteracao ? 'Cancelar alteração' : 'Editar'} id='btnEditar' style={{display: Demandas.isCompleted ? 'none' : 'block', backgroundColor: Demandas.emAlteracao ? 'rgba(255, 0, 0, 0.623)' : 'rgb(14, 55, 145)'}} onClick={() => EditarDemanda(Demandas.id, Demandas.emAlteracao)}>{Demandas.emAlteracao ? <CancelIco /> : <EditSquareIco />}</button>

                                                {/* BTN EXCLUIR */}
                                                <button title='Arquivar' id='btnExcluir' style={{display: Demandas.emAlteracao ? 'none' : 'block'}} onClick={() => ExcluirTask(Demandas.id)}><ArchiveIco /></button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* COMPONENTE PARA DETALHAR INFORMAÇÕES DA DEMANDA */}
                                    <DetalharDemanda Demandas={Demandas} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consulta;