import React, {useCallback, useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {QuoteMutation} from "../../types";
import axiosApi from "../../axiosApi";
import QuoteItem from "../../components/Quotes/QuoteItem";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuoteMutation[]>([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

  let url = '/quotes.json';

  if (id) {
    url = '/quotes.json?orderBy="category"&equalTo="' + id + '"';
  }

  const fetchQuotes = useCallback(async (id: string) => {
    try {
      setLoading(true);
      let response = await axiosApi.get(url);

      if (id === 'star-wars') {
        response = await axiosApi.get(url);
      }

      if (response.data !== null) {
        const quotesApi: QuoteMutation[] = Object.keys(response.data).map(key => {
          const quote = response.data[key];
          quote.id = key;
          return quote;
        });
        setQuotes(quotesApi);
      } else {
        setQuotes([]);
      }
    } finally {
      setLoading(false);
     }
  }, [url]);

  const deleteQuote = async (id: string) => {
    try {
      setLoading(true);
      await axiosApi.delete('/quotes/' + id + '.json');
      fetchQuotes(id).catch(console.error);
    } finally {
      setLoading(false);
    }
  };

  const editQuote = (id: string) => {
    navigate('/quotes/' + id + '/edit');
  };

  useEffect(() => {
    if (location.pathname === '/' ||
      location.pathname === '/quotes' ||
      location.pathname === '/all' ||
      location.pathname === '/quotes/' + id) {
      void fetchQuotes(id!);
    }
  }, [fetchQuotes, location, id]);

  const draw = () => {
    if (quotes.length === 0) {
      return (<div>Quotes block is empty. Choose category or add some quotes to view</div>)
    }

    return (
      quotes.map(quote => (
        <QuoteItem key={Math.random()} quote={quote} onDelete={() => deleteQuote(quote.id)} onEdit={() => editQuote(quote.id)}/>
      ))
    )
  };

  return (
    <div className="d-flex justify-content-around">
      <Sidebar/>
      <div className="m-2">
        {loading ? <Spinner/> : draw()}
      </div>
      <Outlet/>
    </div>
  );
};

export default Home;