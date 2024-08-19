"use client"

import PropTypes from 'prop-types';
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Header } from './header';
import { BackButton } from './back-button';

/**
 * @param {ReactNode} children
 * @param {string} headerLabel
 * @param {string} backButtonLabel
 * @param {string} backButtonHref
 */
export const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref }) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
            <BackButton
                href={backButtonHref}
                label={backButtonLabel}
            />
            </CardFooter>
        </Card>
    )
}

// Definir los prop types para validación
CardWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    headerLabel: PropTypes.string.isRequired,
    backButtonLabel: PropTypes.string.isRequired,
    backButtonHref: PropTypes.string.isRequired
  };