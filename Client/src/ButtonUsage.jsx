import Button from '@mui/material/Button';

export default function ButtonUsage({children, ...props}) {
    return <Button variant="contained" {...props}>{children}</Button>;
}