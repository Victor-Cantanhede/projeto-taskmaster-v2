import SideMenu from '../../components/SideMenu/SideMenu';
import './Consulta.css';

function Consulta() {
    
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
                            <form action="" method="get" autoComplete='off' >

                                {/* INPUT TÍTULO */}
                                <div className='InputContainerForm'>
                                    <label htmlFor="ititulo">Título:</label>
                                    <input type="text" name="titulo" id="ititulo" placeholder='Digite o título da tarefa...' />
                                </div>
                        
                                {/* INPUT CATEGORIA */}
                                <div className='InputContainerForm'>
                                    <label htmlFor="icategoria">Categoria:</label>
                                    <select name="categoria" id="icategoria" defaultValue={""} >
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
                                            <input type="date" name="dataInclusao" id="idataInclusao" />
                                            <p>até</p>
                                            <input type="date" name="dataFinalInclusao" id="idataFinalInclusao" />
                                        </div>
                                    </div>

                                    <div className='ContainerPrazoEntrega'>
                                        <label htmlFor="iprazo">Prazo de entrega:</label>
                                        <input type="date" name="prazo" id="iprazo" />
                                    </div>
                                </div>

                                {/* BUTTON CONSULTAR */}
                                <div className='btnContainerForm'>
                                    <button type='submit'>Consultar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consulta;