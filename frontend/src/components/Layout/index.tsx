'use client';

import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header } from '..';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <div>
        <Header />

        {children}

        <Footer />
      </div>
    </StyledComponentsRegistry>
  );
};

export default Layout;
