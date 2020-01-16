import React from 'react';

function SortColumn({ title, colunmName, pageable, callback }) {
    
    const active = pageable.sort === colunmName;
    const desc = pageable.order === 'desc';
    const _sortColumn = () => {
        if (active) {
            if (desc) {
                callback(null, null);
            } else {
                callback(colunmName, 'desc');
            }
        } else {
            callback(colunmName, 'asc');
        }
    }

    return (
        <a style={{cursor: "pointer"}} onClick={_sortColumn}>
            {title}
            &nbsp;
            {!active && <i className="fas fa-sort"></i>}
            {(active && !desc) && <i className="fas fa-sort-up"></i>}
            {(active && desc) && <i className="fas fa-sort-down"></i>}
        </a>
    );
}

export default SortColumn;