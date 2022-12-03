import React, {useCallback, useEffect, useState} from 'react';
import {Quote} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";

const QuoteForm = () => {
  const [loading, setLoading] = useState(false);
  const [quoteState, setQuoteState] = useState<Quote>({
    author: '',
    category: '',
    text: '',
  });

  const arr = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous People', id: 'famous-people'},
    {title: 'Harry Potter', id: 'harry-potter'},
    {title: 'Lord of the Rings', id: 'lotr'},
    {title: 'Big Lebowski', id: 'big-lebowski'},
  ];
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get('/quotes/' + id + '.json');
      setQuoteState(response.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const quoteChangeInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setQuoteState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosApi.post('/quotes.json', quoteState);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const editQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosApi.put('/quotes/' + id + '.json', quoteState);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQuoteState({
      author: '',
      category: '',
      text: '',
    });

    if (id) {
      fetchQuote().catch(console.error);
    }
  }, [fetchQuote, id]);

  let form = (
    <form onSubmit={addQuote}>
      <h4 className="mt-2">Submit new quote</h4>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category"
                className="form-select"
                value={quoteState.category}
                onChange={quoteChangeInfo}
        >
          <option disabled value="">Choose category</option>
          {arr.map(obj => (
            <option key={Math.random()} value={obj.id}>{obj.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quote-author">Author</label>
        <input
          id="quote-author" type="text" name="author"
          className="form-control"
          value={quoteState.author}
          onChange={quoteChangeInfo}
        />
      </div>
      <div className="form-group">
        <label htmlFor="quote-text">Quote text</label>
        <input
          id="quote-text" type="text" name="text"
          className="form-control"
          value={quoteState.text}
          onChange={quoteChangeInfo}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Create</button>
    </form>
  )

  if (id) {
    form = (
      <form onSubmit={editQuote}>
        <h4 className="mt-2">Submit new quote</h4>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category"
                  className="form-select"
                  value={quoteState.category}
                  onChange={quoteChangeInfo}
          >
            <option disabled value="">Choose category</option>
            {arr.map(obj => (
              <option key={Math.random()} value={obj.id}>{obj.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quote-author">Author</label>
          <input
            id="quote-author" type="text" name="author"
            className="form-control"
            value={quoteState.author}
            onChange={quoteChangeInfo}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quote-text">Quote text</label>
          <input
            id="quote-text" type="text" name="text"
            className="form-control"
            value={quoteState.text}
            onChange={quoteChangeInfo}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Edit</button>
      </form>
    )
  }

  return (
    <div>
      {loading ? <Spinner/> : form}
    </div>
  );
};

export default QuoteForm;