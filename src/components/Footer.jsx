import React from 'react';

const Footer = (props) => {
    return (
        <footer>
            <ul id='footer-contact'>
              <li><a href='mailto:hello@temboinc.com'>hello@temboinc.com</a></li>
              <li>215-427-3608</li>
              <li>© 2019 Tembo Inc.</li>
            </ul>
            <ul id='social-footer'>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/pages/Tembo-Inc/1405814189652179'><img src='http://temboinc.com/wp-content/themes/tembo-inc/library/images/Facebook_White.png' alt='Facebook icon' /></a>
                  </li>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/Tembo_Inc'><img src='http://temboinc.com/wp-content/themes/tembo-inc/library/images/Twitter_White.png' alt='Twitter icon' /></a>
                  </li>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/company/3077954?trk=tyah&amp;trkInfo=tarId%3A1395096304975%2Ctas%3Atembo%2C%20inc.%2Cidx%3A1-1-1'><img src='http://temboinc.com/wp-content/themes/tembo-inc/library/images/LinkedIn_White.png' alt='LinkedIn icon' /></a>
                  </li>
            </ul>
        </footer>
    )
}
export default Footer;