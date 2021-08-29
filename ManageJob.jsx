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
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.reRenderPage = this.reRenderPage.bind(this);

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

    reRenderPage() {
        this.forceUpdate();
    }

    loadData(callback) {
        var link = 'https://talentservicestalent20210826000957.azurewebsites.net/listing/listing/getSortedEmployerJobs';
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
        return (
            
             <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                     { console.log(this.state.loadJobs)}
                        
                        
                        <div className = "ui container">        
                            <div className="container">

                                <h1>List of jobs</h1>
                                
                               
                                <Icon name='filter'/>
                                <span>Filter: </span>
                                <Dropdown text={"Choose Filter"} inline></Dropdown>

                                <Icon name='calendar'/>
                                <span>Sort by Date: </span>
                                <Dropdown text={"Newest first"} inline></Dropdown>
                                
                              

                            </div>

                            <div  style={{ display: 'flex',flexWrap:'wrap', width: "auto"}}>
                             
           
                                {this.state.loadJobs.map( job => {      
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