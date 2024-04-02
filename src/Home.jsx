import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsBookFill } from 'react-icons/bs';
import AccessibleTable from './components/dataTable/DataTable';

function Home({ contracts }) {
    // Izračunaj broj ugovora po statusima
    const statusCounts = contracts.reduce((acc, curr) => {
        const status = curr.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    // Pretpostavljamo da su mogući statusi: KREIRANO, NARUČENO, ISPORUČENO
    const createdCount = statusCounts["KREIRANO"] || 0;
    const orderedCount = statusCounts["NARUČENO"] || 0;
    const deliveredCount = statusCounts["ISPORUČENO"] || 0;
    // Ukupan broj ugovora
    const totalCount = contracts.length;

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>PRIKAZ RAČUNA</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>KREIRANO</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{createdCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>NARUČENO</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{orderedCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>ISPORUČENO</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{deliveredCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>UKUPNO UGOVORA</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{totalCount}</h1>
                </div>
            </div>
            
            <AccessibleTable contracts={contracts} />
        </main>
    );
}

export default Home;
