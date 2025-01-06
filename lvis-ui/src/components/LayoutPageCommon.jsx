import { Box, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom'; // If you are using React Router
import Header from "./Header";

const LayoutPageCommon = ({ breadcrumbData, title, actions, children }) => {
  return (
    <Box>
      {/* Breadcrumb */}
      {breadcrumbData && breadcrumbData.length > 0 && (
        <Box mb="8px" display="flex" alignItems="center">
          {breadcrumbData.map((item, index) => (
            <React.Fragment key={index}>
              <Link
                to={item.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="body2">{item.name}</Typography>
              </Link>
              {index < breadcrumbData.length - 1 && (
                <Typography variant="body2" sx={{ mx: 0.5 }}>
                  /
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Box>
      )}

      {/* Title and Actions */}
      <Header title={title}>
        {actions}
      </Header>

      {/* Content */}
      {children}
    </Box>
  );
};

LayoutPageCommon.propTypes = {
  breadcrumbData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
  actions: PropTypes.node,
  children: PropTypes.node,
};

export default LayoutPageCommon;