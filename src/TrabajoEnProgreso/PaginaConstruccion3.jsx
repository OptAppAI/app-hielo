import { React} from 'react';
import  styled  from 'styled-components';
import { TaskBar } from '../BarraTareas/BarraTareas';

const Principal = styled.div `
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: grid;
    padding: 10px;
    grid-gap: 10px;
    grid-template-rows: 0.4fr 8fr;
    grid-template-areas: 'BarraTareas'
                         'LogoOptApp';
`;

const Progreso = styled.div`
    position: absolute;
    grid-area: LogoOptApp;
    height: 100%;
    width: 100%;
    padding: 30px 0px 80px 0px;
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: auto 2fr 1.5fr;
    grid-template-areas: 'Logo Logo Logo'
                         'WIP WIP WIP'
                         'EngraneAnimado EngraneAnimado EngraneAnimado';
    align-items: center;
    justify-items: center;
`;

const Logo= styled.div`
    grid-area: Logo;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptApp= styled.img`
    height: 300px;
`;

const WIP = styled.div`
    grid-area: WIP;
    text-align: center;
    text-decoration: solid;
    font-size: 2em;
`;

const Engrane= styled.div`
    grid-area: EngraneAnimado;
`;
const EngraneAnimado= styled.img`
    height: 80px;
    animation-name: giro;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes giro{
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(3060deg);
        }
    }
`;

export const PaginaConstruccion3 = () =>{
    return(
        <Principal>
            <TaskBar className='TaskBar'/>
            <Progreso>
                <Logo>
                    <OptApp src={'../Imagenes/LogoOptApp.png'}/>
                </Logo>
                <WIP>TRABAJO EN PROGRESO</WIP>
                <Engrane>               
                    <EngraneAnimado src={'../Imagenes/gears.png'}/>
                </Engrane>
           </Progreso>
        </Principal>
    );
}