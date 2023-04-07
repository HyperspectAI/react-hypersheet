import { CSSProperties } from 'react';
import { createUseStyles } from 'react-jss';

interface StylesProperties {
  [key: string]: CSSProperties | StylesProperties;
}

const styles: StylesProperties = {
  container: {
    marginRight: '15px',
    marginLeft: '15px',
  },
  dFlex: {
    display: 'flex',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  fixedTop: {
    position: 'fixed',
    width: '100%',
  },
  pageHeader: {
    background: '#563ee2',
    display: 'flex',
    flexDirection: 'row',
    height: '60px',
    justifyContent: 'space-between',
    '& pageTitle': {
      color: 'white',
      fontWeight: 400,
    },
  },
  dataSheetToolbar: {
    position: 'relative',
    background: 'white',
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px 8px 16px',
    alignItems: 'center',
    borderBottom: 'solid 1px #e1e1e1',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '& toolbarList': {
      display: 'flex',
      padding: 0,
      margin: 0,
    },
    '& toolbarItem': {
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: 500,
      transition: '0.3s ease',
      margin: '0',
      padding: '8px 12px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      svg: {
        marginRight: '4px',
      },
      '&:hover': {
        color: 'black',
        backgroundColor: '#e1e1e1',
      },
    },
  },
  dataSheetBase: {
    display: 'table',
    width: '100%',
  },
  dataSheetBody: {
    display: 'table-row-group',
  },
  tableRow: {
    display: 'table-row',
    '&:hover': {
      tableData: {
        background: '#f2f2f2',
      },
    },
  },
  tableData: {
    background: 'white',
  },
  tableCell: {
    border: 'solid 1px #e1e1e1',
    minWidth: '180px',
    display: 'table-cell',
    padding: '6px',
    borderLeft: 'none',
    borderTop: 'none',
    fontSize: '13px',
  },
  selectedTableCell: {
    outline: 'solid 1px black',
  },
};

const useStyles = createUseStyles(styles);
export default useStyles;
