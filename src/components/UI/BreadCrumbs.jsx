import {
   Breadcrumbs as MuiBreadCrumbs,
   styled,
   Link as MuiLink,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'

const BreadCrumbs = ({ links }) => (
   <StyledMuiBreadCrumbs>
      {links?.map(({ href, label }, index) => (
         <MuiLink
            key={`${href}-${label}-${index}`}
            component={RouterLink}
            to={href}
            className={index === links.length - 1 ? 'active' : ''}
            underline="hover"
         >
            {label}
         </MuiLink>
      ))}
   </StyledMuiBreadCrumbs>
)

export default BreadCrumbs

const StyledMuiBreadCrumbs = styled(MuiBreadCrumbs)(() => ({
   margin: '0 0 40px 0',

   '& .MuiTypography-root': {
      color: '#c4c4c4',
   },

   '& .active': {
      color: '#222',
      pointerEvents: 'none',
      fontWeight: 500,
   },
}))
