import React from 'react';

import './styles.css';

function Loading() {
    return (
        <div className="loader-wrap">
            <div className="loader">
                <div className="circle-1 circle">
                    <div className="circle-2 circle">
                        <div className="circle-3 circle">
                            <div className="circle-4 circle">
                            </div>
                        </div>
                    </div>
                </div>
                <p className="loading-text">Carregando...</p>
            </div>
        </div>
    )
}

export default Loading;