/* eslint-disable max-len */
import { createUseStyles } from 'react-jss';

// interface StylesProperties {
//   [key : unique]: CSSProperties | StylesProperties;
// }

const styles = {
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
  justifySpaceBetween: {
    justifyContent: 'space-between',
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
    // position: 'fixed',
    width: '100%',
  },
  pageHeader: {
    background: '#563ee2',
    display: 'flex',
    flexDirection: 'row',
    height: '60px',
    justifyContent: 'space-between',
    '&.pageTitle': {
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
    // borderBottom: 'solid 1px #e1e1e1',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    '&.toolbarList': {
      display: 'flex',
      padding: 0,
      margin: 0,
    },
    '&.toolbarItem': {
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
      '& svg': {
        marginRight: '4px',
      },
      '&:hover': {
        color: 'black',
        backgroundColor: '#e1e1e1',
      },
    },
  },
  dataSheetBase: {
    width: '100%',
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    height: '100%',
  },
  dataSheetBody: {
    // display: 'table-row-group',
    display: 'table',
    width: '100%',
    height: '100%',
  },
  tableHeader: {
    background: '#f2f2f2',
    color: 'black',
    display: 'table-row',
  },
  tableRow: {
    display: 'table-row-group',
    '&:hover': {
      tableData: {
        background: '#f2f2f2',
      },
    },
  },
  tableHeaderGroup: {
    display: 'table-header-group',
  },
  tableData: {
    background: 'white',
    display: 'table-row',
  },
  tableCellBody: {
    display: 'table-row-group',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  tableCell: {
    border: 'solid 1px #e1e1e1',
    maxWidth: '200px',
    display: 'inline-block',
    padding: '6px',
    borderLeft: 'none',
    borderTop: 'none',
    fontSize: '13px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'normal', /* Update whiteSpace property */
    wordBreak: 'break-all', /* Add wordBreak property */
    verticalAlign: 'middle',
  },
  selectedTableCell: {
    outline: 'solid 1px black',
  },
  selectedTableCellInput: {
    outline: 0,
    border: 0,
  },
  dropdownList: {
    position: 'absolute',
    background: '#fff',
    width: '150px',
    left: '0',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 1px rgba(0,0,0,0.24), 0 0 2px rgba(0,0,0,0.16), 0 3px 4px rgba(0,0,0,0.06), 0 6px 8px rgba(0,0,0,0.06), 0 12px 16px rgba(0,0,0,0.08), 0 18px 32px rgba(0,0,0,0.06)',
    top: '40px',
    maxHeight: '300px',
    overflow: 'auto',
    '&.fieldDropdown': {
      left: '10px',
    },
    '&.filterDropdown': {
      left: '10px',
      width: 'auto',
    },
  },
  dropdownListItem: {
    padding: '6px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    alignItems: 'center',
    display: 'block',
    marginBottom: '5px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  checkboxLabel: {
    marginLeft: '5px',
  },
  dataSheetText: {
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      left: '10px',
      width: 'auto',
    },
  },
  '@media (max-width: 568px)': {
    dataSheetText: {
      '& span': {
        display: 'none',
      },
    },
    dataSheetToolbar: {
      '&.toolbarItem': {
        padding: '8px',
        fontSize: '18px',
      },
    },
  },
};

const useStyles = createUseStyles(styles);
export default useStyles;
