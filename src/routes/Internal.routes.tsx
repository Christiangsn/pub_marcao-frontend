import { Route } from "react-router";
import { MenuContentClient } from "../components/MenuContentClient";
import { ClientHome } from "../pages/Client";
import { RoomClients } from "../pages/Client/RoomClients";
import { Home } from "../pages/NavBar";

export function Internal () {
    return (
        <>
            <Home />
            <MenuContentClient />
            <Route path='/clients' exact component={ClientHome} />
            <Route path='/clients/list' exact component={RoomClients} />

        </>
      )
}


