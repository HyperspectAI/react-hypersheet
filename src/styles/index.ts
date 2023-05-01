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
    position: 'fixed',
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
    display: 'table',
    width: '100%',
  },
  dataSheetBody: {
    // display: 'table-row-group',
  },
  tableHeader: {
    background: '#f2f2f2',
    color: 'black',
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
    width: '200px',
    display: 'table-cell',
    padding: '6px',
    borderLeft: 'none',
    borderTop: 'none',
    fontSize: '13px',
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
    display: 'flex',
    marginBottom: '5px',
  },
  checkboxLabel: {
    marginLeft: '5px',
  },
};

const useStyles = createUseStyles(styles);
export default useStyles;
