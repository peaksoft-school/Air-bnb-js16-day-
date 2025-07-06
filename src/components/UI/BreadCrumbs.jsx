import { Link, Breadcrumbs as MuiBreadCrumbs, styled } from '@mui/material'

const BreadCrumbs = ({ links }) => (
   <StyledMuiBreadCrumbs>
      {links?.map(({ href, label }, index) => (
         <Link
            key={`${href}-${label}-${index}`}
            href={href}
            className={index === links.length - 1 ? 'active' : ''}
         >
            {label}
         </Link>
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
   },
}))
