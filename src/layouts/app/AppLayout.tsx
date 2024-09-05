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
import { useLocation, useNavigate } from "react-router";
import {
  Categories,
  Dashboard,
  Logout,
  Product,
  SalesOps,
  User,
  UserMultiple,
} from "@carbon/icons-react";
import { format } from "date-fns";
import useSessionStore from "../../stores/sessionStore";
import classes from "./AppLayout.module.scss";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { session, setSession } = useSessionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      setIsRendered(true);
    }
  }, [session, navigate]);

  const isActive = (pathName: string) => location.pathname.includes(pathName);

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
              onClick={() => navigate("/dashboard")}
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
                    onClick={() => navigate("/dashboard")}
                    style={{ cursor: "pointer" }}
                    isActive={isActive("/dashboard")}
                  >
                    Dashboard
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={UserMultiple}
                    onClick={() => navigate("/users")}
                    style={{ cursor: "pointer" }}
                    isActive={isActive("/users")}
                  >
                    Users
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={Categories}
                    onClick={() => navigate("/categories")}
                    style={{ cursor: "pointer" }}
                    isActive={isActive("/categories")}
                  >
                    Categories
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={Product}
                    onClick={() => navigate("/products")}
                    style={{ cursor: "pointer" }}
                    isActive={isActive("/products")}
                  >
                    Products
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={SalesOps}
                    onClick={() => navigate("/sales")}
                    style={{ cursor: "pointer" }}
                    isActive={isActive("/sales")}
                  >
                    Sales
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
