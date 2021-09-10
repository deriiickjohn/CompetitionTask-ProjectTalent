import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Label} from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
            //console.log(loader)
        this.state = {
            
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "asc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: false,
                showExpired: false,
                showUnexpired: false
            },
            totalPages: 1,
            activeIndex: "",
            
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        

    };

    init() {


        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData(); 
        
    };

    // reRenderPage() {
    //     this.forceUpdate();
    // }

    loadData(callback) {
         var link = `https://talentservicestalent20210826000957.azurewebsites.net/listing/listing/getSortedEmployerJobs?activePage=${this.state.activePage}&sortbyDate=${this.state.sortBy.date}&showActive=${this.state.filter.showActive}&showClosed=${this.state.filter.showClosed}&showExpired=${this.state.filter.showExpired}&showUnexpired=${this.state.filter.showUnexpired}&limit=50`;
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
       
        $.ajax({
            url : link,
            headers: {
                'Authorization' : 'Bearer ' + cookies,
                'Content-Type' : 'application/json'

            },
            type : "GET",
         
            contentType : "application/json",
            dataType: "json",
            success : function (res) {
                
                this.setState( {loadJobs : res.myJobs})
            
            }.bind(this)
        })


        console.log(link);
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    

    render() {

        const SortChoices = [ 
            { key: 1, text : 'desc', value : 'desc'},
            { key: 2, text : 'asc', value : 'asc'},
        ]

        const FilterChoices = [
            { key: 1, text : 'Show Active', value : 'Show Active'},
            { key: 2, text : 'Show Closed', value : 'Show Closed'},
            { key: 3, text : 'Show Draft', value : 'Show Draft'},
            { key: 4, text : 'Show Expired', value : 'Show Expired'},
            { key: 5, text : 'Show Unexpired', value : 'Show Unexpired'},
        ]


    

    
        return (
            
             <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                        
                            <div className = "ui container">        
                                <div className="container">

                                    <h1>List of Job</h1>
                                    
                                
                                    <Icon name='filter'/>
                                    <span>Filter: </span>
                                    <Dropdown 
                                        inline
                                        options ={FilterChoices}
                                        onChange = {
                                            (e) => {
                                                if (e.target.innerText === 'Show Active'){
                                                    this.setState({
                                                        filter : {
                                                            showActive : true,
                                                            showClosed : false,
                                                            showDraft: false,
                                                            showExpired : false,
                                                            showUnexpired:false
                                                        }
                                                    }, () => this.loadData());
                                                   
                                                }else if (e.target.innerText === 'Show Closed') {
                                                    this.setState({
                                                        filter : {
                                                            showActive : false,
                                                            showClosed : true,
                                                            showDraft: false,
                                                            showExpired : false,
                                                            showUnexpired:false
                                                        }
                                                    }, () => this.loadData());

                                                   
    
                                                
                                                }else if (e.target.innerText === 'Show Draft') {
                                                    this.setState({
                                                        filter : {
                                                            showActive : false,
                                                            showClosed : false,
                                                            showDraft: true,
                                                            showExpired : false,
                                                            showUnexpired:false
                                                        }
                                                    }, () => this.loadData());
                                                   
                                                }else if (e.target.innerText === 'Show Expired') {
                                                    this.setState({
                                                        filter : {
                                                            showActive : false,
                                                            showClosed : false,
                                                            showDraft: false,
                                                            showExpired : true,
                                                            showUnexpired:false
                                                        }
                                                    }, () => this.loadData());
                                                  
                                                }else if (e.target.innerText === 'Show Unexpired') {
                                                    this.setState({
                                                        filter : {
                                                            showActive : false,
                                                            showClosed : false,
                                                            showDraft: false,
                                                            showExpired : false,
                                                            showUnexpired:true
                                                        }
                                                    }, () => this.loadData());
                                                    
                                                }

                                               
                                            
                                                
                                                console.log(this.state.filter);

                                            }
                                        }
                                            
                                        ></Dropdown>

                                    <Icon name='calendar'/>
                                    <span>Sort by Date: </span>
                                    <Dropdown 
                                        inline
                                        options = {SortChoices}
                                        onChange = {
                                            (e) => {
                                                this.setState( {
                                                    sortBy : {
                                                        date: e.target.innerText
                                                    }
                                                } );

                                                this.loadData();
                                            }
                                        }
                                        ></Dropdown>
                                    
                                

                                </div>

                                <div  style={{ display: 'flex',flexWrap:'wrap', width: "auto"}}>
                                
                                {console.log(this.state.loadJobs)}

                                    {
                                    this.state.loadJobs.map(job => {
                                        return  <JobSummaryCard key={job.id} reload={ this.loadData} id={job.id} roleName={job.title} city={job.location.city} country = {job.location.country} description={job.summary}></JobSummaryCard>                     
                                    })}
                
                                </div>  


                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={1}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={1}
                                    totalPages={1}
                                />

                                

                            </div>  

                    
                           
                        </BodyWrapper>
                         
        )
    }
}