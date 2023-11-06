import React, {Component} from "react";
import tutorialService from "../services/tutorial.service";
import {Link} from "react-router-dom";
export default class TutorialsList extends Component {

    constructor(props)
    {
        super(props);
        this.tutorials = []
        this.state = {
            filteredTutorials:[],
            currentIndex : -1,
            currentTutorial : null,
            searchValue : ""
        }

    }

    //tutoriallist sayfası çağrıldığında devreye giren fonksiyon
    componentDidMount() 
    {
        this.tutorialllariGetir();
    }

    tutorialllariGetir()
    {
        tutorialService.getAll().then(tutorialListesi => {
            console.log(tutorialListesi);
            this.setState({
                filteredTutorials : tutorialListesi.data
            });
            this.tutorials = tutorialListesi.data
        }).catch(hata => {
            console.log("hata oluştu"+hata);
        })
    }

    AktifTutorial(tutorial,index) {
        console.log("here")
        this.setState({
            currentTutorial : tutorial,
            currentIndex : index
        })
    }

    onChangeCaptureHandler = (e) => {
        const filteredData = this.tutorials.filter((element) => {
            //if no input the return the original
            if (e.target.value === '') {
                return element;
            }
            //return the item which contains the user input
            else {
                return element.title.toLowerCase().includes(e.target.value.toLowerCase())
            }
        })
        this.setState({filteredTutorials:filteredData})
    };

    render() {
        const {filteredTutorials,currentTutorial,currentIndex}  = this.state

        return(
            <div className="list row">
              
                <div className="col-md-6">
                <h4>Tutorial Listesi</h4>
                <ul className="list-group">
                    <li>
                    <div className="input-group">
                        <input onChangeCapture ={(e) => this.onChangeCaptureHandler(e)} type="text" className="form-control" aria-label=""/>
                        <span className="input-group-text">Ara</span>
                    </div>
                    <br></br>
                    </li>
                    {filteredTutorials && filteredTutorials.map((tutorial,index)=>( //tutorials array içindeki her bir elemanı tutorial nesnesi olarak kullandık
                            <li className={"list-group-item " +(index === currentIndex ? "active" : "")}
                            onClick={() => this.AktifTutorial(tutorial,index)}
                            key={index}>
                                {tutorial.title}
                                </li>
                    ))}
                   
                </ul>
                </div>

                <div className="col-md-6">
                   {currentTutorial ? 
                   (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                        <label>
                            <strong>Başlık : </strong>
                        </label>{" "}{currentTutorial.title}
                        </div>
                        <div>
                        <label>
                            <strong>Açıklama : </strong>
                        </label>{" "}{currentTutorial.description}
                        </div>
                        <div>
                        <label>
                            <strong>Durum : </strong>
                        </label>{" "}{currentTutorial.published ? "Yayınlandı " : "Bekleniyor..."}
                        </div>
                        <Link to={"/tutorials/"+currentTutorial.id} className="btn btn-success">Düzenle</Link>
                    </div>
                   ) :
                   (
                   <div></div>
                   )}
                </div>
             </div>
        )
        
    }

}