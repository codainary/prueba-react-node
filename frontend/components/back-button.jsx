"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

/**
 * @param {string} label
 * @param {string} href
 */
export const BackButton = ({ href, label }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

// Definir los prop types para validación
BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
