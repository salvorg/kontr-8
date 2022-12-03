import React from 'react';
import {QuoteMutation} from "../../types";

interface Props {
  quote: QuoteMutation;
  onDelete: React.MouseEventHandler;
  onEdit: React.MouseEventHandler;
}

const QuoteItem: React.FC<Props> = ({quote, onDelete, onEdit}) => {
  return (
    <div className='card mb-2'>
      <div className="card-body">
        <h2>"{quote.text}"</h2>
        <p className='card-text'>-{quote.author}</p>
        <div>
          <button type="button" className="btn btn-danger m-1" onClick={onDelete}>X</button>
          <button type="button" className="btn btn-primary m-1" onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default QuoteItem;