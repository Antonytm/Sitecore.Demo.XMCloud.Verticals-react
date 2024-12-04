import React from 'react';
import { Placeholder, SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { ParallaxProvider } from 'react-scroll-parallax';
import componentFactory from "temp/componentFactory";

export const ReactPlaceholder = (props) => {
  return (
    <ParallaxProvider>
			<SitecoreContext layoutData={props.layoutData} componentFactory={componentFactory}>
        <Placeholder name={props.name} rendering={props.rendering} componentFactory={componentFactory} />
      </SitecoreContext>
		</ParallaxProvider>
  );
}

export default ReactPlaceholder;