import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/ShoppingCart';
import Arrow from '@material-ui/icons/PlayArrowOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CategoryInterface from '../category/CategoryInterface'
import DispalyFormat from '../category/DisplayFormat'
import BrandInterface from '../brand/BrandInterface'
import DisplayBrand from '../brand/DisplayBrand'
import ModelInterface from '../model/ModelInterface'
import DisplayModel from '../model/DisplayModel'
import ProductInterface from '../product/ProductInterface'
import DisplayProduct from '../product/DisplayProduct'
import ProductPicture from '../productPicture/ProductPicture'



const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
     // backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
   //   backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
     // backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function DashboardList(props){
const classes = useStyles();
const handleClick=(value)=>{
  props.handleView(value)
}

  return(
      
    <TreeView
      className={classes.root}
      //defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
    <StyledTreeItem nodeId="100" labelText="Categories" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="AddCategory"
          labelIcon={Arrow}
          onClick={()=>handleClick(<CategoryInterface/>)}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="DisplayCategory"
          labelIcon={Arrow}
          onClick={()=>handleClick(<DispalyFormat/>)}
          color="#e3742f"
          bgColor="#fcefe3"
        />
      
      </StyledTreeItem>
     
      <StyledTreeItem nodeId="200" labelText="Brand" labelIcon={Label}>
        <StyledTreeItem
          nodeId="7"
          labelText="Add Brand"
          labelIcon={Arrow}
          onClick={()=>handleClick(<BrandInterface/>)}
                 
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="DisplayBrand"
          labelIcon={Arrow}
          onClick={()=>handleClick(<DisplayBrand/>)}
          color="#e3742f"
          bgColor="#fcefe3"
        />
      
      </StyledTreeItem>

      <StyledTreeItem nodeId="300" labelText="Models" labelIcon={Label}>
        <StyledTreeItem
          nodeId="9"
          labelText="AddModel"
          labelIcon={Arrow}
          onClick={()=>handleClick(<ModelInterface/>)}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="10"
          labelText="DisplayModel"
          labelIcon={Arrow}
          onClick={()=>handleClick(<DisplayModel/>)}
          color="#e3742f"
          bgColor="#fcefe3"
        />
      
      </StyledTreeItem>

      <StyledTreeItem nodeId="400" labelText="Product" labelIcon={Label}>
        <StyledTreeItem
          nodeId="11"
          labelText="AddProduct"
          labelIcon={Arrow}
          onClick={()=>handleClick(<ProductInterface/>)}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="12"
          labelText="DisplayProduct"
          labelIcon={Arrow}
          onClick={()=>handleClick(<DisplayProduct/>)}
          color="#e3742f"
          bgColor="#fcefe3"
        />
      
      </StyledTreeItem>

      <StyledTreeItem nodeId="500" labelText="Product Picture" labelIcon={Label}>
        <StyledTreeItem
          nodeId="13"
          labelText="AddProductPicture"
          labelIcon={Arrow}
          onClick={()=>handleClick(<ProductPicture/>)}
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
      
      
      </StyledTreeItem>


          </TreeView>

    // <ListItem button>
    //   <ListItemIcon>
    //     <DashboardIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Dashboard" />
    // </ListItem>
    // <ListItem button>
    //   <ListItemIcon>
    //     <ShoppingCartIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Orders" />
    // </ListItem>
    // <ListItem button>
    //   <ListItemIcon>
    //     <PeopleIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Customers" />
    // </ListItem>
    // <ListItem button>
    //   <ListItemIcon>
    //     <BarChartIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Reports" />
    // </ListItem>
    // <ListItem button>
    //   <ListItemIcon>
    //     <LayersIcon />
    //   </ListItemIcon>
    //   <ListItemText primary="Integrations" />
    // </ListItem>

);
}

