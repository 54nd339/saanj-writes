import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Grid,
  Heading,
  FormLabel,
  Select
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from '@/icons'
import { locales } from '@/lib/_locales'

function GridColumnHeading({ children }) {
  return (
    <Heading
      as="h3"
      fontSize="sm"
      fontWeight="semibold"
      color="gray.400"
      letterSpacing="wider"
      textTransform="uppercase"
    >
      {children}
    </Heading>
  )
}

function GridColumn({ links, title }) {
  return (
    <div>
      <GridColumnHeading>{title}</GridColumnHeading>

      <Stack as="ul" mt={4} spacing={4}>
        {links.map((link) => (
          <li key={link.id}>
            <Link href={`/${link.slug}`} passHref>
              <ChakraLink
                color="gray.300"
                _hover={{
                  color: 'white'
                }}
              >
                {link.navigationLabel ||
                  link.slug.charAt(0).toUpperCase() + link.slug.slice(1)}
              </ChakraLink>
            </Link>
          </li>
        ))}
      </Stack>
    </div>
  )
}

function SocialMediaLink({ href, title, icon }) {
  return (
    <ChakraLink
      href={href}
      isExternal
      color="gray.400"
      _hover={{
        color: 'gray.300'
      }}
    >
      <VisuallyHidden>{title}</VisuallyHidden>
      <Box as={icon} w={6} h={6} />
    </ChakraLink>
  )
}

export default function Footer({ primaryLinks, secondaryLinks }) {
  const router = useRouter()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const setLocale = (event) => {
    router.push(router.asPath, router.asPath, { locale: event.target.value })
  }

  const isLink = primaryLinks.length || secondaryLinks.length

  return (
    <Box as="footer" bg="gray.800" aria-labelledby="footerHeading">
      <VisuallyHidden as="h2" id="footerHeading">
        Footer
      </VisuallyHidden>

      <Box maxW="7xl" mx="auto" py={{ base: 12, lg: 16 }} px={[4, 6, null, 8]}>
        {!!isLink && <Box
          pb={8}
          display={{ xl: 'grid' }}
          gridTemplateColumns={{ xl: 'repeat(5, 1fr)' }}
          gridGap={{ xl: 8 }}
        >
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gridGap={8}
            gridColumn={{ xl: 'span 4 / span 4' }}
          >
            {!!primaryLinks.length && <GridColumn
              links={primaryLinks}
              title="Primary"
            />}

            {!!secondaryLinks.length && <GridColumn
              links={secondaryLinks}
              title="Secondary"
            />}
          </Grid>

          {/* <Box mt={{ base: 12, xl: 0 }}>
            <GridColumnHeading>Language</GridColumnHeading>

            <Box as="form" mt={4} maxW={{ sm: 'xs' }}>
              <Box as="fieldset" w="full">
                <VisuallyHidden as={FormLabel} htmlFor="language">
                  Language
                </VisuallyHidden>

                <Box position="relative">
                  <Select
                    id="language"
                    name="language"
                    color="white"
                    bg="gray.700"
                    borderColor="transparent"
                    fontSize={{ sm: 'sm' }}
                    value={activeLocale.value}
                    onChange={setLocale}
                  >
                    {locales.map((locale) => (
                      <Box
                        as="option"
                        bg="#374151!important"
                        color="white"
                        key={locale.value}
                        value={locale.value}
                      >
                        {locale.label}
                      </Box>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
          </Box> */}
        </Box>}

        <Box
          mt={7}
          pt={8}
          borderTopWidth={!!isLink ? "1px" : 0}
          borderColor={!!isLink ? "gray.700" : 0}
          display={{ md: 'flex' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack direction="row" display="flex" spacing={6} order={{ md: 2 }}>
            <SocialMediaLink
              title="Instagram"
              icon={InstagramIcon}
              href="https://instagram.com/_psammead_"
            />
            <SocialMediaLink
              title="Facebook"
              icon={FacebookIcon}
              href="https://www.facebook.com/profile.php?id=100077087075105"
            />
          </Stack>

          <Text
            mt={[8, null, 0]}
            fontSize="md"
            color="gray.400"
            order={{ md: 1 }}
          >
            &copy; {new Date().getFullYear()} Sanjeebani Nanda. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
