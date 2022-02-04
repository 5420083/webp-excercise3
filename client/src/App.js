import { useEffect, useState } from "react";
import { fetchImages, fetchImages2 ,getRanking ,postRanking} from "./api";
import { BrowserRouter as Router, Route, Switch , Link} from "react-router-dom";


function Header() {
  return (
    <header className="hero is-danger is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Dog Gallery</h1>
          <h6>
          ～日本大学文理学部情報科学科 Webプログラミングの演習課題～
          </h6>
          5420083 東智輝
          
        </div>
      </div>
      <div className="culumns has-text-centered">
      <Link className="button culumn " to="/">garally</Link>
      <Link className="button culumn" to="/ranking">ranking</Link>
      </div>
    </header>
  );
}

function Image(props) {
  const datas = props.src.split('/');
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
         <img src={props.src} alt="cute dog!" />
         <p>{datas[4]}</p>
        </figure>
      </div>
    </div>
  );
}


function Loading() {
  return <p>Loading...</p>;
}


function Gallery(props) {
  const{ urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}



  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { breed } = event.target.elements;
      props.onFormSubmit(breed.value);
    }
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="random">
                  <option value="random">random</option>
                  <option value="shiba">Shiba</option>
                  <option value="akita">Akita</option>
                  <option value="hound">hound</option>
                  <option value="australian">australian</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages2().then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    if(breed == "random"){
      fetchImages2().then((urls) => {
        setUrls(urls);
      });
    }else{
      fetchImages(breed).then((urls) => {
        setUrls(urls);
      });
    }   
  }
  
  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}



function Ranking() {
  const [ran, setRan] = useState(null);
  useEffect(() => {
    getRanking().then((data) => {
      setRan(data);
    });
  }, []);
  return(
    <div>
      {
        (() => {
          if(ran==null){
            return <Loading />
        }else{
            return <ShowPoint ran={ran}/>
        }
        })()
}
    </div>
  );
}

function ShowPoint(props){
  const ran = props.ran;
  return(
    <div>
      {ran.map((r) => {
        return (
          <div key={r.id} className="culumns">
              <div className="culumn">
                <p>{r.sub} : {r.point}</p>
                <button onClick={()=>postRanking(r.id)}>touhyou</button>
              </div>
          </div>
        );
      })}
    </div>
  );
}



 
function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
}



function App() {
  return (
    <Router>
      <Header />
      <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
             <Route path="/ranking" exact>
              <Ranking />
            </Route> 
          </Switch>
      <Footer />
    </Router>
  );
}

export default App;