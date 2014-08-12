# ydm

`ydm` is a command line tool to help manage and automate the complexity encountered in sophisticated uses of Docker.

## Requirements

Dew works on any machine that has Docker v1.1.1 or newer installed locally. See Limitations at the end of this document for non-local possibilities.

## Install

Use npm to install:

`npm install -g dew`

## Usage Examples

Install [Strider-CD](https://github.com/Strider-CD/strider) in one command, and publish all ports.

`dew strider install --publish`

That was easy considering that strider is self-contained. Let's try something more difficult.

Install [GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab-ce/tree/master) in one command, and publish all ports.

`dew gitlab install --namespace awesome --publish`

## Other Software

You can create "drops" by looking at the current examples in the `drops/` directory. All you need to get started is a Docker image. For a simple example, look at the `postgresql` dew drop.

If you need to store additional files, create a directory (e.g. `drops/gitlab/index.js`) -- but if it's something simple, you can just create a single file (e.g. `drops/postgresql.js`).

*Fork, automate, submit pull requests!*

## Testing

You can add tests for your drop -- take a look at `test/drops/postgresql/test.js` for a simple example.

## Example Use Case

You want to deploy Gitlab, you find a good Image for it on the Docker Registry.

Reading the documentation, you see that the author recommends you use PostgreSQL via another Image.

You learn how docker does container links and how to manage those.

You setup the postgres container and write down the generated username and password so you can create the user and database for Gitlab on it using `psql` 

Ok that's done... now you need to spawn a temporary container with `rake` commands that you must attach to in order to input 'yes' when it asks -- no problem, done.

(For full version, check Sameer's docs at https://registry.hub.docker.com/u/sameersbn/gitlab/ )

Now you've done the delicate dance of setting up Gitlab properly, modularly, with Docker.

How do you keep track of all this complexity? How do you script it for next time? Can you?

Well, you can, and you should. Dew provides a way in which to do it -- this blueprint is called a dew drop.

Because docker images are tagged and versioned, you can safely freeze a workflow per a set of Images.

The dew drop provides simple namespaces and persistence (via JSON files on disk exposed as HTML5 localStorage api). In it you can describe the nature of container interconnection, exposure to the outside world, and whatever else may be necessary -- it's just JavaScript.

Finally, we want flexibility -- a dew drop is not a static blueprint but a living, changing one -- it has been designed by me to facilitate this. I hope I did a good job.

So whenever Sameer extracts Redis out of the Gitlab image and forces you to use that in a linked fashion too, you'll be ready, you'll just edit the dew drop accordingly and just `dew drop gitlab reinstall --namespace develop` until you get it right.

## Limitations

Although `dew` uses the Docker remote api, it needs to be installed and used directly on the docker host.

This is because `dew` manages volumes for you automatically and needs to be able to create and destroy folders within the `scope` (these can be found in `~/.dew`).

This can be easily solved by making `dew` itself provide/consume an HTTP api of its own. This may actually be a great idea considering that securing the Docker API is not really within Docker's scope -- therefore `dew` could do it instead.

## Upstream API Resources

* https://docs.docker.com/reference/api/docker_remote_api_v1.13/
* https://github.com/apocas/dockerode/blob/master/lib/container.js
