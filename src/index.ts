import '../wdyr';
import { jss } from 'react-jss';
import jssPluginNested from 'jss-plugin-nested';
import Table from './Table';

import './styles/index.css';

jss.use(jssPluginNested());

export default Table;
