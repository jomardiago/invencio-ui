import { useEffect, useState } from "react";
import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  Loading,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Theme,
} from "@carbon/react";
import { HeaderContainerRenderProps } from "@carbon/react/lib/components/UIShell/HeaderContainer";
import { useNavigate } from "react-router";
import {
  Categories,
  Dashboard,
  Logout,
  Product,
  User,
  UserMultiple,
} from "@carbon/icons-react";
import { format } from "date-fns";
import useSessionStore from "../../stores/sessionStore";
import classes from "./AppLayout.module.scss";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, setSession } = useSessionStore();
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      setIsRendered(true);
    }
  }, [session, navigate]);

  const logout = () => {
    setSession(undefined);
    navigate("/login");
  };

  if (!isRendered) return <Loading />;

  return (
    <HeaderContainer
      render={({
        isSideNavExpanded,
        onClickSideNavExpand,
      }: HeaderContainerRenderProps) => (
        <>
          <Header aria-label="Invencio, an Inventory Management System">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName
              prefix=""
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Invencio
            </HeaderName>
            <div>
              <p className={classes.currentDate}>
                {format(new Date(), "PPPP")}
              </p>
            </div>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label={session?.email}
                onClick={() => {}}
              >
                <User size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="logout"
                onClick={logout}
                tooltipAlignment="end"
              >
                <Logout size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <Theme theme="g90">
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                onSideNavBlur={onClickSideNavExpand}
                href="#main-content"
              >
                <SideNavItems>
                  <SideNavLink
                    renderIcon={Dashboard}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={UserMultiple}
                    onClick={() => navigate("/users")}
                    style={{ cursor: "pointer" }}
                  >
                    Users
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={Categories}
                    onClick={() => navigate("/categories")}
                    style={{ cursor: "pointer" }}
                  >
                    Categories
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={Product}
                    style={{ cursor: "pointer" }}
                  >
                    Products
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Theme>
          </Header>
          <div className={classes.container}>{children}</div>
        </>
      )}
    />
  );
}

export default AppLayout;
