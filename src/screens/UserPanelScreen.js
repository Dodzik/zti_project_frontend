import React, {useState} from "react";
import {Container, NavLink} from "react-bootstrap";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import UserContactsScreen from "../components/UserContactsScreen";
import AllMyCallsScreen from "../components/AllMyCallsScreen";
import UserProfileScreen from "../components/UserProfileScreen";



async function queryForMyContacts(request) {
    console.log(request)
    return  fetch('http://localhost:8080/contacts/getAllUserContacts/'+request.userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}
async function queryForAllMyCalls(request) {
    console.log(request)
    return  fetch('http://localhost:8080/talk/getAllCalls/'+request.userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function getUserInfo(request) {
    console.log(request)
    return fetch('http://localhost:8080/user/getUserInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(data => data.json())
}
// async function queryForMyProfile(request) {
//     console.log(request)
//     return  fetch('http://localhost:8080/api/myGroups', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(request)
//     })
//         .then(data => data.json())
//
// }

function UserPanelScreen(context){
    const [profile, setProfile] = useState(false);
    const [myContacts, setMyContacts] = useState(false);
    const [allMyCalls, setAllMyCalls] = useState(false);
    const [auth] = useState(context.auth);

    const [data , setData] = useState();
    const [loaded,setLoaded] = useState(false)
    console.log("przenoszenie user id")
    console.log(context.userId)

    async function myContactsClickHandle() {
        console.log("kliknieto myContacts")
        setLoaded(false)
        setProfile(false)
        setAllMyCalls(false)
        setMyContacts(true)
        // e.preventDefault();
        console.log("debugging")
        const response = await queryForMyContacts({
            "userId" : context.userId,
        });
        console.log("data w user panel po requescie")
        await setData(response)
        setLoaded(true)
    }
    async function AllMyCalls() {
        console.log("kliknieto all my calls")
        setLoaded(false)
        setProfile(false)
        setMyContacts(false)
        setAllMyCalls(true)
        console.log("debugging")
        const response = await queryForAllMyCalls({
            "userId" : context.userId,
        });
        await setData(response)
        console.log(data)
        setLoaded(true)
    }
    const eventGetUserInfo = async e => {
        console.log("kliknieto PROFILE")
        setLoaded(false)
        setMyContacts(false)
        setAllMyCalls(false)
        setProfile(true)
        console.log("debugging")
        const response = await getUserInfo({
            id: context.userId
        });
        await setData(response)
        console.log(data)
        setLoaded(true)
    }

    return (
        <>
        {
            auth === true &&
                <>
                    <div className="min-vh-100 modal-dialog-centered "
                         style={{display: 'flex', height: '100vh', overflow: 'scroll initial'}}>

                        <CDBSidebar textColor="#fff" backgroundColor="#333" className="position-fixed">
                            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                                    User Panel
                            </CDBSidebarHeader>
                            <CDBSidebarContent className="sidebar-content">
                                <CDBSidebarMenu>
                                    <CDBSidebarMenuItem icon="user">
                                        <div onClick={eventGetUserInfo}>
                                            My Profile
                                        </div>
                                    </CDBSidebarMenuItem>
                                    <CDBSidebarMenuItem icon="columns">
                                        <div onClick={myContactsClickHandle}>
                                            My Contacts
                                        </div>
                                    </CDBSidebarMenuItem>
                                    <CDBSidebarMenuItem icon="table">
                                        <div onClick={AllMyCalls}>
                                            All my calls
                                        </div>

                                    </CDBSidebarMenuItem>

                                </CDBSidebarMenu>
                            </CDBSidebarContent>
                            <CDBSidebarFooter style={{textAlign: 'center'}}>
                                <NavLink href="/">
                                    <CDBSidebarMenuItem>Log out </CDBSidebarMenuItem>
                                </NavLink>
                            </CDBSidebarFooter>
                        </CDBSidebar>

                            <Container className="overflow-auto min-vw-100"
                                style={{display: 'flex', width: "100%", height: '100vh', overflow: 'scroll initial'}}>
                                {profile === true && loaded === true &&
                                    <UserProfileScreen userId={context.userId} setUserId={context.setUserId} data={data}/>}
                                {myContacts === true && loaded === true &&
                                    <UserContactsScreen userId={context.userId} setUserId={context.setUserId} data={data}/>}
                                {allMyCalls === true && loaded === true &&
                                    <AllMyCallsScreen userId={context.userId} setUserId={context.setUserId}
                                                          data={data}/>}
                            </Container>
                    </div>
                </>
        }
        </>
    )
}

export default UserPanelScreen;
